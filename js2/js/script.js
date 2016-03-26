var usersLogin = [];
var currentUser;
var userID;
var i;

usersLogin.length = 5;
for (i = 0; i < usersLogin.length; i++) {
        usersLogin[i] = prompt('Введите логин пользователя №'+(i+1));
    }
currentUser = prompt('Введите логин');
function find(array, value) {
    var j;
      for (j = 0; j < array.length; j++) {
            if (array[j] === value) return j;
          }
      return -1;
}
userID=find(usersLogin,currentUser);
if (userID===-1) {
    alert('Ошибка идентификации');
} else {
    alert(usersLogin[userID]+", Вы успешно вошли");
}
