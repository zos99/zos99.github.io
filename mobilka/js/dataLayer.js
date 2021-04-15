/**
 * добавляем в массив impressions (РЭК) данные о товарах
 * @param _array
 */
function addImpressionsTo(_array, _type)
{
    if (!_array) return false;

    if (!window.ecommerce) window.ecommerce = {};
    if (_type) {
        if (_type == 'banner') {
            if (!window.ecommerce.promoView) {
                window.ecommerce.promoView = {
                    'promotions' : _array
                };
            }
            else {
                for (_i in _array) {
                    window.ecommerce.promoView.promotions.push(_array[_i]);
                }
            }
        }
        if (_type == 'detail') {
            window.ecommerce.detail = {
                'actionField' : {
                    'list' : 'ProductPage'
                },
                'products'    : [_array]
            };
        }
    }
    else {
        window.ecommerce.currencyCode = 'RUB';

        if (!window.ecommerce.impressions) {
            window.ecommerce.impressions = _array;
        }
        else {
            for (_i in _array) {
                window.ecommerce.impressions.push(_array[_i]);
            }
        }
    }
}

/**
 * добавляет данные просмотра товаров, загруженных Аяксом
 * @param _array
 */
function addAjaxImpressions(_array)
{

    if (!window.loaded) {
        // если страница еще не загружена - накапливаем
        if (!window.collectedViews) {
            window.collectedViews = _array;
        }
        else {
            for (_i in _array) {
                window.collectedViews.push(_array[_i]);
            }
        }
    }
    else {
        // если страница уже загружена - сразу отправляем
        sendOwoxProductsByChunk(_array, 0, window.chunkLength);
    }
}

/**
 * отправка просмотров о товарах пакетами по chunkLength товаров
 *
 * @param impressions
 * @param firstPushValue
 * @param chunkLength
 * @returns {boolean}
 */
function sendOwoxProductsByChunk(impressions, firstPushValue, chunkLength)
{
    if (1 || !impressions.length) return false;

    var i, j, impressionsChunks = [];

    for (i = firstPushValue, j = impressions.length; i < j; i += chunkLength) {
        impressionsChunks.push(impressions.slice(i, i + chunkLength));
    }

    for (i = 0, j = impressionsChunks.length; i < j; i++) {
        //console.debug('sendOneChunk');
        //console.debug(impressionsChunks[i]);
        dataLayer.push(
            {
                'event'         : 'OWOX',
                'eventCategory' : 'Non-Interactions',
                'eventAction'   : 'show',
                'eventLabel'    : 'products',
                'eventContext'  : 'title',
                'ecommerce'     : {
                    'impressions' : impressionsChunks[i]
                }
            }
        );
    }
}

function categoryParse(fullPath)
{
    return fullPath.length >= 3 ? fullPath[2] : fullPath[1];
}

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookieDL(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
 * обработка клика по товару в списке
 * @param productObj
 * @param listType
 */
function goFromList(productObj, listType, event, link)
{

    var debug = 0;
    var link = link || null;

    if (window.eecDebug > 0)
        debug = 1;

    if (!listType) listType = 'catalog_list';

    // if(debug) debugger;
    if (debug) console.log(productObj);
    if (debug) console.log(listType);

    if (productObj.url) {
        if (window.google_tag_manager) {

            var fullPath = new Array();
            if (productObj.category != null) {
                fullPath = productObj.category.split(' / ');
            }

            switch (listType) {

                default:
                    dataLayer.push(
                        {
                            'event'                  : 'OWOX',
                            'eventCategory'          : 'Interactions',
                            'eventAction'            : 'open',
                            'eventLabel'             : 'productPage',
                            'eventContext'           : productObj.eventContext !== undefined ? productObj.eventContext : 'title',
                            'eventContent'           : null,
                            'eventPosition'          : productObj.position ? productObj.position : null,
                            'eventLocation'          : listType ? listType : null,
                            'eventCategoryGroupName' : fullPath ? fullPath[1] : null,
                            'eventCategoryName'      : categoryParse(fullPath),
                            'eventCategoryId'        : productObj.sectionId ? String(productObj.sectionId) : null,
                            'eventProductName'       : productObj.name ? productObj.name : null,
                            'eventProductId'         : productObj.id ? String(productObj.id) : null,
                            'eventProductPrice'      : parseFloat(productObj.price) ? parseFloat(productObj.price).toFixed(2) : null,
                            'userPhonelHash'         : null,
                            'userEmailHash'          : null,
                            'ecommerce'              : {
                                'click' : {
                                    'actionField' : {
                                        'list' : listType
                                    },
                                    'products'    : [
                                        {
                                            'id'                : productObj.id ? String(productObj.id) : null,
                                            'name'              : productObj.name ? productObj.name : null,
                                            'category'          : categoryParse(fullPath),
                                            'brand'             : productObj.brand ? productObj.brand : null,
                                            'position'          : productObj.position ? productObj.position : null,
                                            'productTag'        : productObj.productTag ? productObj.productTag : "(not set)",
                                            'price'             : parseFloat(productObj.price) ? parseFloat(productObj.price).toFixed(2) : null,
                                            'eventProductPrice' : parseFloat(productObj.price) ? parseFloat(productObj.price).toFixed(2) : null
                                        }
                                    ]
                                }
                            },
                            'eventCallback'          : function() {
                                // зажаты специальные кнопки, либо нажато колесо мыши - откроем в новой вкладке
                                if (event.which == 2 || event.shiftKey || event.ctrlKey || event.metaKey) {
                                    if (link) {
                                        window.open(link, '_blank');
                                    } else {
                                        window.open(productObj.url, '_blank');
                                    }
                                }
                                else {
                                    if (debug == 0) {
                                        if (link) {
                                            document.location = link
                                        } else {
                                            document.location = productObj.url
                                        }
                                    }
                                }
                            }
                        }
                    );
                    break;
            }

            if (debug) console.log(dataLayer[dataLayer.length - 1]);
            // if(debug == 0)  document.location = productObj.url
        }
        else {
            if (debug == 0) document.location = productObj.url
        }
    }
}

// called from artbanners.list and index_second_block templates
function discountClick()
{
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'click',
            'eventLabel'             : 'discountedProducts',
            'eventContext'           : null,
            'eventContent'           : null,
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventCategoryGroupName' : null,
            'eventCategoryName'      : null,
            'eventCategoryId'        : null,
            'eventProductName'       : null,
            'eventProductId'         : null,
            'eventProductPrice'      : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : null
        }
    );
}

// click showAll button in section
function clickShowAll(type, portalName, ad_category)
{
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'click',
            'eventLabel'             : 'showAll',
            'eventContext'           : null,
            'eventContent'           : null,
            'eventPosition'          : null,
            'eventLocation'          : type ? type : null,
            'eventCategoryGroupName' : null,
            'eventCategoryName'      : portalName ? portalName : null,
            'eventCategoryId'        : ad_category ? ad_category : null,
            'eventProductName'       : null,
            'eventProductId'         : null,
            'eventProductPrice'      : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : null
        }
    );
}

// добавлен рейтинг товара
function addRaiting(elem)
{
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'click',
            'eventLabel'             : 'rateProduct',
            'eventContext'           : 'productPage',
            'eventContent'           : elem.rate ? elem.rate : null,
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventCategoryGroupName' : elem.section_path ? elem.section_path : null,
            'eventCategoryName'      : elem.category_name,
            'eventCategoryId'        : elem.category_id ?  elem.category_id : null,
            'eventProductName'       : elem.item_name ? elem.item_name : null,
            'eventProductId'         : elem.id ? elem.id : null,
            'eventProductPrice'      : parseFloat(elem.item_price).toFixed(2),
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : null
        }
    );
}
// страница результатов поиска
function searchResultsPage(search)
{
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'click',
            'eventLabel'             : 'search',
            'eventContent'           : search,
            'eventContext'           : null,
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventCategoryGroupName' : null,
            'eventCategoryName'      : null,
            'eventCategoryId'        : null,
            'eventProductName'       : null,
            'eventProductPrice'      : null
        }
    );
}

// клик по продолжить оформление заказа
function continueCheckoutClick()
{
    if(!window.contactDetailsSend) {

        dataLayer.push(
            {
                'event'                  : 'OWOX',
                'eventCategory'          : 'Interactions',
                'eventAction'            : 'click',
                'eventLabel'             : 'contactDetails',
                'eventContent'           : null,
                'eventContext'           : null,
                'eventPosition'          : null,
                'eventLocation'          : null,
                'eventCategoryGroupName' : null,
                'eventCategoryName'      : null,
                'eventCategoryId'        : null,
                'eventProductName'       : null,
                'eventProductPrice'      : null,
                'ecommerce'              : {
                    'checkout' : {
                        'actionField' : {
                            'step'   : '1',
                            'option' : null

                        },
                        'products'    : [window.checkoutProducts]
                    }
                }
            }
        );

        window.contactDetailsSend = true;
    }
}

// клик по баннеру в разделе каталога
function bannerInSectionClick(elem)
{
    var _src = $(elem).find('img').attr('src');
    var _id = $(elem).attr('data-id');

    if (_src && window.ecommerce['promoView']) {
        // найдем описание баннера
        var _bannerInfo = false;
        var href = $(elem).find('a').attr("href");
        if (href == "#" || href === undefined) href = false;

        for (_i in window.ecommerce['promoView']['promotions']) {
            var _oneBanner = window.ecommerce['promoView']['promotions'][_i];
            if (_oneBanner['id'].indexOf(_id) > -1) {
                _bannerInfo = _oneBanner;
            }
        }

        if (_bannerInfo) {
            dataLayer.push(
                {
                    'event'                  : 'OWOX',
                    'eventCategory'          : 'Interactions',
                    'eventAction'            : 'open',
                    'eventLabel'             : 'productPage',
                    'eventContext'           : null,
                    'eventContent'           : null,
                    'eventPosition'          : null,
                    'eventLocation'          : null,
                    'eventCategoryGroupName' : null,
                    'eventCategoryName'      : null,
                    'eventCategoryId'        : null,
                    'eventProductName'       : null,
                    'eventProductId'         : null,
                    'eventProductPrice'      : null,
                    'userPhonelHash'         : null,
                    'userEmailHash'          : null,
                    'ecommerce'              : {
                        'promoClick' : {
                            'promotions' : [_bannerInfo]
                        }
                    },
                    'eventCallback'          : function() {
                        if (href) {
                            document.location = href;
                        }
                    }
                }
            );
        }
    }
}

// добавление-удаление из избранного
function toFavoritesClick(elem)
{
    dataLayer.push(
        {
            'event'          : 'WishList',
            'type'           : elem.action,
            'sku'            : (elem.type === 'complect') ? elem.id : elem.xml_id,
            'item_name'      : elem.item_name,
            'item_price'     : elem.item_price,
            'category_id'    : elem.category_id,
            'category_name'  : elem.category_name,
            'quantity_total' : elem.count,
            'is_complect'    : (elem.type === 'complect') ? 1 : 0
        }
    );
}

// смена города
function changeCityClick(cityName, redirect)
{
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'switch',
            'eventLabel'             : 'cityName',
            'eventContext'           : null,
            'eventContent'           : cityName ? cityName : null,
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventCategoryGroupName' : null,
            'eventCategoryName'      : null,
            'eventCategoryId'        : null,
            'eventProductName'       : null,
            'eventProductId'         : null,
            'eventProductPrice'      : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : null
        }
    );
    if(redirect!==false) {
        location.href = location.pathname + location.search + location.hash;
        location.reload();
    }
}

// кнопка собрать свой комплект в КТ
function getComplectButtonClick()
{
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'click',
            'eventLabel'             : 'chooseKit',
            'eventContext'           : null,
            'eventContent'           : null,
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventCategoryGroupName' : window.fullPath ? window.fullPath[1] : null,
            'eventCategoryName'      : window.fullPath.length > 3 ? window.fullPath[2] : window.fullPath[window.fullPath.length - 1],
            'eventCategoryId'        : window.categoryXmlId ? window.categoryXmlId : null,
            'eventProductName'       : window.productName ? window.productName : null,
            'eventProductId'         : window.productId ? String(window.productId) : null,
            'eventProductPrice'      : window.productPrice ? window.productPrice : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : null
        }
    );
}

// сабмит формы поиска в шапке
function searchFormInHeaderSubmit(elem)
{
    var val = $(elem).find('input[name="search"]').val();

    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'click',
            'eventLabel'             : 'search',
            'eventContext'           : null,
            'eventContent'           : val ? val : null,
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventCategoryGroupName' : null,
            'eventCategoryName'      : null,
            'eventCategoryId'        : null,
            'eventProductName'       : null,
            'eventProductId'         : null,
            'eventProductPrice'      : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : null
        }
    );
}

// отправлена форма напишите нам
function write2usSended()
{
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'send',
            'eventLabel'             : 'feedback',
            'eventContext'           : null,
            'eventContent'           : null,
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventCategoryGroupName' : null,
            'eventCategoryName'      : null,
            'eventCategoryId'        : null,
            'eventProductName'       : null,
            'eventProductId'         : null,
            'eventProductPrice'      : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : null
        }
    );
}

// сброшен фильтр
function resetFilter()
{
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'click',
            'eventLabel'             : 'removeAllFilters',
            'eventContext'           : null,
            'eventContent'           : null,
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventCategoryGroupName' : window.portalName ? window.portalName : window.caregoryGroupName,
            'eventCategoryName'      : window.categoryName ? window.categoryName : null,
            'eventCategoryId'        : window.ad_category ? window.ad_category : null,
            'eventProductName'       : null,
            'eventProductId'         : null,
            'eventProductPrice'      : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : null
        }
    );
}

// применен фильтр
function applyFilter()
{
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'click',
            'eventLabel'             : 'applyFilters',
            'eventContext'           : null,
            'eventContent'           : null,
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventCategoryGroupName' : window.portalName ? window.portalName : window.caregoryGroupName,
            'eventCategoryName'      : window.categoryName ? window.categoryName : null,
            'eventCategoryId'        : window.ad_category ? window.ad_category : null,
            'eventProductName'       : null,
            'eventProductId'         : null,
            'eventProductPrice'      : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : null
        }
    );
}

// добавлен комментарий
function commentaryAdded()
{
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'send',
            'eventLabel'             : 'review',
            'eventContext'           : 'productPage',
            'eventContent'           : null,
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventCategoryGroupName' : window.fullPath ? window.fullPath[1] : null,
            'eventCategoryName'      : window.fullPath.length > 3 ? window.fullPath[2] : window.fullPath[window.fullPath.length - 1],
            'eventCategoryId'        : window.categoryXmlId ? window.categoryXmlId : null,
            'eventProductName'       : window.currentProduct.name ? window.currentProduct.name : null,
            'eventProductId'         : window.currentProduct.id ? window.currentProduct.id : null,
            'eventProductPrice'      : window.currentProduct.price ? window.currentProduct.price : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : document.cookie.indexOf('email_hash') >= 0 ? getCookieDL('email_hash') : null,
            'ecommerce'              : null
        }
    );
}

// кнопка добавить отзыв в КТ
function addReviewButtonInKTClick()
{
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'add',
            'eventLabel'             : 'review',
            'eventContext'           : 'productPage',
            'eventContent'           : null,
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventCategoryGroupName' : window.fullPath ? window.fullPath[1] : null,
            'eventCategoryName'      : window.fullPath.length > 3 ? window.fullPath[2] : window.fullPath[window.fullPath.length - 1],
            'eventCategoryId'        : window.categoryXmlId ? window.categoryXmlId : null,
            'eventProductName'       : window.currentProduct.name ? window.currentProduct.name : null,
            'eventProductId'         : window.currentProduct.id ? window.currentProduct.id : null,
            'eventProductPrice'      : window.currentProduct.price ? window.currentProduct.price : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : null
        }
    );
}

// продолжить покупки в корзине
function continueShoppingInBasketClick()
{
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'click',
            'eventLabel'             : 'continueShopping',
            'eventContext'           : null,
            'eventContent'           : null,
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventCategoryGroupName' : null,
            'eventCategoryName'      : null,
            'eventCategoryId'        : null,
            'eventProductName'       : null,
            'eventProductId'         : null,
            'eventProductPrice'      : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : null
        }
    );
}

// клик по баннеру в слайдере на главной
function mainBannerClick(elem)
{
    var _src = $(elem).find('img').attr('src');
    var _id = $(elem).attr('data-id');

    if (_src && window.ecommerce['promoView']) {
        // найдем описание баннера
        var _bannerInfo = false;

        for (_i in window.ecommerce['promoView']['promotions']) {
            var _oneBanner = window.ecommerce['promoView']['promotions'][_i];
            if (_oneBanner['id'] !== null && _oneBanner['id'] !== undefined) {
                if (_oneBanner['id'].indexOf(_id) > -1) {
                    _bannerInfo = _oneBanner;
                }
            }
        }

        if (_bannerInfo) {
            dataLayer.push({
                'event'                  : 'OWOX',
                'eventCategory'          : 'Interactions',
                'eventAction'            : 'open',
                'eventLabel'             : 'productPage',
                'eventContext'           : null,
                'eventContent'           : null,
                'eventPosition'          : null,
                'eventLocation'          : null,
                'eventCategoryGroupName' : null,
                'eventCategoryName'      : null,
                'eventCategoryId'        : null,
                'eventProductName'       : null,
                'eventProductId'         : null,
                'eventProductPrice'      : null,
                'userPhonelHash'         : null,
                'userEmailHash'          : null,
                'ecommerce'              : {
                    'promoClick' : {
                        'promotions' : [_bannerInfo]
                    }
                }

            });
        }
    }
}

// смена сортировки в каталоге
function changeSortCatalogClick(elem)
{
    var _sort = $(elem).find('option:selected').val();
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'switch',
            'eventLabel'             : 'sort',
            'eventContext'           : null,
            'eventContent'           : _sort,
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventCategoryGroupName' : window.portalName ? window.portalName : null,
            'eventCategoryName'      : window.caregoryGroupName ? window.caregoryGroupName : null,
            'eventCategoryId'        : window.ad_category ? window.ad_category : null,
            'eventProductName'       : null,
            'eventProductId'         : null,
            'eventProductPrice'      : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : null
        }
    );
}

// переключение вида в каталоге
function toggleCatalogViewTypeClick(_type)
{
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'click',
            'eventLabel'             : 'view',
            'eventContext'           : null,
            'eventContent'           : _type === 'list' ? 'list' : 'tile',
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventCategoryGroupName' : window.portalName ? window.portalName : null,
            'eventCategoryName'      : window.caregoryGroupName ? window.caregoryGroupName : null,
            'eventCategoryId'        : window.ad_category ? window.ad_category : null,
            'eventProductName'       : null,
            'eventProductId'         : null,
            'eventProductPrice'      : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : null
        }
    );
}

// клик по телефону в футере
function footerPhoneClick()
{
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'click',
            'eventLabel'             : 'callback',
            'eventContext'           : null,
            'eventContent'           : null,
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventCategoryGroupName' : null,
            'eventCategoryName'      : null,
            'eventCategoryId'        : null,
            'eventProductName'       : null,
            'eventProductId'         : null,
            'eventProductPrice'      : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : null
        }
    );
}

// клик по кнопке "напишите нам"
function write2usClick()
{
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'click',
            'eventLabel'             : 'feedback',
            'eventContext'           : null,
            'eventContent'           : 'button',
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventCategoryGroupName' : null,
            'eventCategoryName'      : null,
            'eventCategoryId'        : null,
            'eventProductName'       : null,
            'eventProductId'         : null,
            'eventProductPrice'      : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : null
        }
    );
}

// клик по маленькой корзине в шапке
function smallBasketClick()
{
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'click',
            'eventLabel'             : 'cart',
            'eventContext'           : null,
            'eventContent'           : null,
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventCategoryGroupName' : null,
            'eventCategoryName'      : null,
            'eventCategoryId'        : null,
            'eventProductName'       : null,
            'eventProductId'         : null,
            'eventProductPrice'      : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : null
        }
    );
}

// buy_now template
function basketButtonClick()
{
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'click',
            'eventLabel'             : 'cart',
            'eventContext'           : null,
            'eventContent'           : null,
            'eventPosition'          : null,
            'eventLocation'          : 'PopUp',
            'eventCategoryGroupName' : null,
            'eventCategoryName'      : null,
            'eventCategoryId'        : null,
            'eventProductName'       : null,
            'eventProductId'         : null,
            'eventProductPrice'      : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : null
        }
    );
}

// subscribe template
function subscribeResultPush(subscribeResult)
{
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'click',
            'eventLabel'             : 'subscribe',
            'eventContext'           : subscribeResult ? subscribeResult : null,
            'eventContent'           : null,
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventCategoryGroupName' : null,
            'eventCategoryName'      : null,
            'eventCategoryId'        : null,
            'eventProductName'       : null,
            'eventProductId'         : null,
            'eventProductPrice'      : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : document.cookie.indexOf('email_hash') >= 0 ? getCookieDL('email_hash') : null,
            'ecommerce'              : null
        }
    );
}

function addToBasketDL(from, data)
{
    if (from === 'productPage') {
        data['currentProduct']['position'] = null;
    } else {
        data['currentProduct']['position'] = data['eventPosition'];
    }

    _eventCategoryGroupName = data['eventCategoryGroupName'];
    if (Array.isArray(_eventCategoryGroupName)) {
        _eventCategoryGroupName = data['eventCategoryGroupName'][1];
    }

    _eventCategoryName = data['eventCategoryName'];
    if (Array.isArray(_eventCategoryName)) {
        _eventCategoryName = data['eventCategoryName'].length >= 3 ? data['eventCategoryName'][2] : data['eventCategoryName'][1];
    }

    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Conversions',
            'eventAction'            : 'add',
            'eventLabel'             : 'cart',
            'eventPosition'          : data['eventPosition'],
            'eventLocation'          : data['eventLocation'],
            'eventContent'           : data['eventContent'] ? data['eventContent'] : null,
            'eventContext'           : data['eventContext'] ? data['eventContext'] : null,
            'eventCategoryGroupName' : _eventCategoryGroupName ? _eventCategoryGroupName : null,
            'eventCategoryId'        : data['eventCategoryId'] ? String(data['eventCategoryId']) : null,
            'eventCategoryName'      : _eventCategoryName,
            'eventProductName'       : data['eventProductName'] ? data['eventProductName'] : null,
            'eventProductId'         : data['eventProductId'] ? String(data['eventProductId']) : null,
            'eventProductPrice'      : data['eventProductPrice'] ? data['eventProductPrice'] : null,

            'ecommerce' : {
                'currencyCode' : 'RUB',
                'add'          : {
                    'actionField' : {
                        'list'   : data['eventLocation'],
                        'action' : 'add'
                    },
                    'products'    : (data['currentProduct'] instanceof Array) ? data['currentProduct'] : [data['currentProduct']] //если пришел объект=товар, то передаем массив с этим товаром, есил пришел массив товаров, то передаем как есть
                }
            }
        }
    );

    // console.log(dataLayer[dataLayer.length - 1]);
    // debugger;
}

function searchTabClick() {
  dataLayer.push({
    'event'         : 'OWOX',
    'eventCategory' : 'Interactions',
    'eventAction'   : 'click',
    'eventLabel'    : 'searchResults'
  });
}

function searchTabClickArrow() {
  dataLayer.push({
    'event'         : 'OWOX',
    'eventCategory' : 'Interactions',
    'eventAction'   : 'clickArrow',
    'eventLabel'    : 'searchResults'
  });
}

function searchTabScroll() {
  dataLayer.push({
    'event'         : 'OWOX',
    'eventCategory' : 'Interactions',
    'eventAction'   : 'scroll',
    'eventLabel'    : 'searchResults'
  });
}


function desingDepartureSuccess() {
  dataLayer.push({
    'event'         : 'OWOX',
    'eventCategory' : 'Conversions',
    'eventAction'   : 'Form_success',
    'eventLabel'    : '/promo/shtory/'
  });
}

function desingDepartureUnsuccess() {
  dataLayer.push({
    'event'         : 'OWOX',
    'eventCategory' : 'Conversions',
    'eventAction'   : 'Form_unsuccess',
    'eventLabel'    : '/promo/shtory/'
  });
}

// клик по табу в КТ
function clickTabKT(action, label)
{
    dataLayer.push({
        'event'         : 'OWOX',
        'eventCategory' : 'Interactions',
        'eventAction'   : action,
        'eventLabel'    : label
    });
}

// клик по стрелке на табах в КТ
function clickArrowTabKT(label)
{
    dataLayer.push({
        'event'         : 'OWOX',
        'eventCategory' : 'Interactions',
        'eventAction'   : 'tabsProductPage',
        'eventLabel'    : label
    });
}

function changeQuantityDL(from, data, type)
{
    _eventCategoryGroupName = data['eventCategoryGroupName'];
    if (Array.isArray(_eventCategoryGroupName)) {
        _eventCategoryGroupName = data['eventCategoryGroupName'][1];
    }

    _eventCategoryName = data['eventCategoryName'];
    if (Array.isArray(_eventCategoryName)) {
        _eventCategoryName = data['eventCategoryName'].length >= 3 ? data['eventCategoryName'][2] : data['eventCategoryName'][1];
    }

    if (type === 'add') {
        ecommerce = {
            'add' : {
                'actionField' : {
                    'list'   : data['eventLocation'],
                    'action' : type
                },
                'products'    : [data['currentProduct']]
            }
        }
    } else if (type === 'remove') {
        ecommerce = {
            'remove' : {
                'actionField' : {
                    'list'   : data['eventLocation'],
                    'action' : type
                },
                'products'    : [data['currentProduct']]
            }
        }
    }

    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'change',
            'eventLabel'             : 'quantity',
            'eventPosition'          : null,
            'eventLocation'          : data['eventLocation'],
            'eventContent'           : type,
            'eventContext'           : data['eventContext'] ? data['eventContext'] : null,
            'eventCategoryGroupName' : _eventCategoryGroupName ? _eventCategoryGroupName : null,
            'eventCategoryId'        : data['eventCategoryId'] ? String(data['eventCategoryId']) : null,
            'eventCategoryName'      : _eventCategoryName,
            'eventProductName'       : data['eventProductName'] ? data['eventProductName'] : null,
            'eventProductId'         : data['eventProductId'] ? String(data['eventProductId']) : null,
            'eventProductPrice'      : data['eventProductPrice'] ? data['eventProductPrice'] : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : ecommerce
        }
    );
}

function removeFromBasketDL(id, from)
{
    _eventCategoryGroupName = window.removeItemsDL[id]['eventCategoryGroupName'];


    _eventCategoryName =  window.removeItemsDL[id]['eventCategoryName'];

    // console.log(data, _eventCategoryGroupName, _eventCategoryName);
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'remove',
            'eventLabel'             : from ? from : 'cart',
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventContent'           : null,
            'eventContext'           : 1,
            'eventCategoryGroupName' : _eventCategoryGroupName ? _eventCategoryGroupName : null,
            'eventCategoryId'        : window.removeItemsDL[id]['eventCategoryId'] ? String(window.removeItemsDL[id]['eventCategoryId']) : null,
            'eventCategoryName'      : _eventCategoryName,
            'eventProductName'       : window.removeItemsDL[id]['eventProductName'] ? window.removeItemsDL[id]['eventProductName'] : null,
            'eventProductId'         : window.removeItemsDL[id]['eventProductId'] ? String(window.removeItemsDL[id]['eventProductId']) : null,
            'eventProductPrice'      : window.removeItemsDL[id]['eventProductPrice'] ? window.removeItemsDL[id]['eventProductPrice'] : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : {
                'remove' : {
                    'actionField' : {
                        'list'   : 'cart',
                        'action' : 'remove'
                    },
                    'products'    : [window.checkoutProductsByID[id]]
                }
            }
        }
    );
}

function topMenuClickDL(data)
{
    dataLayer.push(
        {
            'event'         : 'OWOX',
            'eventCategory' : 'Interactions',
            'eventAction'   : 'click',
            'eventLabel'    : 'popUpMenu',
            'eventLocation' : data['title'],
            'eventContent'  : data['href']
        }
    );
}

function click360LinkKT()
{
    dataLayer.push(
        {
            'event'         : 'OWOX',
            'eventCategory' : 'Interactions',
            'eventAction'   : 'click',
            'eventLabel'    : '360degrees',
            'eventContext'  : 'productPage',
        }
    );
}

// клик на "загрузить в appStore" или "доступно в GooglePlay"
function getTheApp()
{
    dataLayer.push(
        {
            'event'                  : 'OWOX',
            'eventCategory'          : 'Interactions',
            'eventAction'            : 'click',
            'eventLabel'             : 'appstore',
            'eventContext'           : 'appStore|gPlay',
            'eventContent'           : null,
            'eventPosition'          : null,
            'eventLocation'          : null,
            'eventCategoryGroupName' : null,
            'eventCategoryName'      : null,
            'eventCategoryId'        : null,
            'eventProductName'       : null,
            'eventProductId'         : null,
            'eventProductPrice'      : null,
            'userPhonelHash'         : null,
            'userEmailHash'          : null,
            'ecommerce'              : null
        }
    )
}

// нажали на иконку фотоаппарата в строке поиска
function openPhotoSearchDL() {
    // dataLayer.push(
    //     {
    //         'event'         : 'OWOX',
    //         'eventCategory' : 'Interactions',
    //         'eventAction'   : 'click',
    //         'eventLabel'    : 'searchPhoto'
    //     }
    // )
}

function similarImgClick(article) {
    dataLayer.push(
        {
            'event'         : 'OWOX',
            'eventCategory' : 'Interactions',
            'eventAction'   : 'click',
            'eventLabel'    : 'similarImg',
            'eventContent'  : article ? article : null,
        }
    )
}

function checkDataLayer()
{
    console.time('check dataLayer');

    var _products = [];
    var _errors = {};
    _errors['totalErrorsCount'] = 0;
    _errors['impressionsErrorsCount'] = 0;
    _errors['clickErrorsCount'] = 0;
    _errors['msg'] = [];

    var _requiredFields = [
        "eventLocation", "eventProductId", "eventProductName", "eventProductPrice", "eventCategoryId",
        "eventCategoryName", "eventContext", "eventLabel"
    ];

    for (var property in dataLayer) {
        if (dataLayer.hasOwnProperty(property)) {
            _dlObj = dataLayer[property];

            for (var property2 in _dlObj) {
                if (_dlObj.hasOwnProperty(property2)) {

                    // impressions
                    if (property2 === "eventCategory" && _dlObj[property2] === "Non-Interactions") {
                        if (_dlObj['ecommerce'] !== null) {
                            _impressions = _dlObj['ecommerce']['impressions'];
                        } else {
                            console.groupCollapsed('IMPRESSIONS - empty ecommerce array');
                            console.log(_dlObj);
                            _errors['totalErrorsCount']++;
                            _errors['impressionsErrorsCount']++;
                            console.groupEnd('IMPRESSIONS - empty ecommerce array');
                            _errors['msg'].push('IMPRESSIONS - empty ecommerce array');
                            _errors['msg'].push(_dlObj);
                            continue;
                        }
                        for (var property3 in _impressions) {
                            if (_impressions.hasOwnProperty(property3)) {

                                _impression = _impressions[property3];

                                for (var property4 in _impression) {
                                    if (_impression.hasOwnProperty(property4)) {

                                        if (property4 === "id") {
                                            _id = _impression[property4];
                                        }

                                        if (_impression[property4] === undefined || _impression[property4] === "") {
                                            if (property4 === 'name' && (_impression[property4] !== null)) {
                                                console.groupCollapsed('IMPRESSIONS - name not null for id = ' + _id);
                                                console.log(property4 + ' = ' + _impression[property4]);
                                                console.log(_impression);
                                                console.groupEnd('IMPRESSIONS - name not null for id = ' + _id);
                                                _errors['totalErrorsCount']++;
                                                _errors['impressionsErrorsCount']++;
                                                _errors['msg'].push('IMPRESSIONS - name not null for id = ' + _id);
                                                _errors['msg'].push(_impression);
                                            }
                                            console.groupCollapsed('IMPRESSIONS - wrong value in ' + property4 + " for id = " + _id);
                                            console.log(property4 + ' = ' + _impression[property4]);
                                            console.log(_impression);
                                            console.groupEnd('wrong value in ' + property4 + " for id = " + _id);
                                            _errors['totalErrorsCount']++;
                                            _errors['impressionsErrorsCount']++;
                                            _errors['msg'].push('IMPRESSIONS - wrong value in ' + property4 + " for id = " + _id);
                                            _errors['msg'].push(_impression);
                                        }
                                    }
                                }

                            }
                        }
                    } else
                    // clicks
                    if (property2 === "eventCategory" && _dlObj[property2] === "Interactions") {
                        if (_dlObj['ecommerce'] !== null) {
                            if (Array.isArray(_dlObj['ecommerce']['click']) && _dlObj['ecommerce']['click'] !== null) {
                                _products = _dlObj['ecommerce']['click']['products'];
                            } else if (Array.isArray(_dlObj['ecommerce']['remove']) && _dlObj['ecommerce']['remove'] !== null) {
                                _products = _dlObj['ecommerce']['remove']['products'];
                            }
                        } else {
                            console.groupCollapsed('CLICK - empty ecommerce array');
                            console.log(_dlObj);
                            _errors['totalErrorsCount']++;
                            _errors['clickErrorsCount']++;
                            console.groupEnd('CLICK - empty ecommerce array');
                            _errors['msg'].push('CLICK - empty ecommerce array');
                            _errors['msg'].push(_dlObj);
                            continue;
                        }

                        _requiredFields.forEach(
                            function(item, i) {
                                if (_dlObj[item] === "" || _dlObj[item] === null || _dlObj[item] === undefined) {
                                    console.groupCollapsed('CLICK - wrong value in ' + item);
                                    console.log(_dlObj);
                                    console.groupEnd('CLICK - wrong value in ' + item);
                                    _errors['totalErrorsCount']++;
                                    _errors['clickErrorsCount']++;
                                    _errors['msg'].push('CLICK - wrong value in ' + item);
                                    _errors['msg'].push(_dlObj);
                                }
                            }
                        );

                        if (_products !== undefined) {
                            for (var property32 in _products) {
                                if (_products.hasOwnProperty(property32)) {

                                    _product = _products[property32];

                                    for (var property42 in _product) {
                                        if (_product.hasOwnProperty(property42)) {

                                            if (property42 === "id") {
                                                _id = _product[property42];
                                            }

                                            if (_product[property42] === undefined || _product[property42] === "") {
                                                console.groupCollapsed('CLICK - wrong value in ' + property42 + " for id = " + _id);
                                                console.log(property42 + ' = ' + _product[property42]);
                                                console.log(_product);
                                                console.groupEnd('wrong value in ' + property42 + " for id = " + _id);
                                                _errors['totalErrorsCount']++;
                                                _errors['clickErrorsCount']++;
                                                _errors['msg'].push('CLICK - wrong value in ' + property42 + " for id = " + _id);
                                                _errors['msg'].push(_product);
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
            }

        }
    }
    console.log("Total errors - " + _errors['totalErrorsCount']);
    console.log("Impressions errors - " + _errors['impressionsErrorsCount']);
    console.log("Click errors - " + _errors['clickErrorsCount']);

    console.timeEnd('check dataLayer');

    return _errors;
}

// клик по "Услуги сборки"
function openPopupAssembly() {
    dataLayer.push({
        'event'         : 'OWOX',
        'eventCategory' : 'Interactions',
        'eventAction'   : 'click',
        'eventLabel'    : 'assemble',
        'eventLocation'  : window.location.href,
    })
}

// клик по "Подробнее о сборке" в попапе "Услуги сборки"
function openAssemblyDetail() {
    dataLayer.push({
        'event'         : 'OWOX',
        'eventCategory' : 'Interactions',
        'eventAction'   : 'click',
        'eventLabel'    : 'assembleDetails',
        'eventLocation'  : window.location.href,
    })
}

//после загрузки скрипта выполняем событие
var datalayerLoadedEvent = document.createEvent("Event");
datalayerLoadedEvent.initEvent("datalayerLoaded", true, true);
document.dispatchEvent(datalayerLoadedEvent);
