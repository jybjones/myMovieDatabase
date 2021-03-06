//////login/logout/////
//Javascript Login and Registration//
//login: a@abc.com, password: abc created from firebase//

$('.onTempPassword form').submit(function () {
  var email = fb.getAuth().password.email;
  var oldPw = $('.onTempPassword input:nth-child(1)').val();
  var newPw = $('.onTempPassword input:nth-child(2)').val();

  fb.changePassword({
    email: email,
    oldPassword: oldPw,
    newPassword: newPw
  }, function(err) {
    if (err) {
      alert(err.toString());
    } else {
      fb.unauth();
    }
  });

  event.preventDefault();
})

$('.doResetPassword').click(function () {
  var email = $('.onLoggedOut input[type="email"]').val();

  fb.resetPassword({
    email: email
  }, function (err) {
    if (err) {
      alert(err.toString());
    } else {
      alert('Check your email!');
    }
  });
});

$('.doLogout').click(function () {
  fb.unauth();
  document.location.reload(true);
 })


$('.doRegister').click(function () {
  var email = $('.onLoggedOut input[type="email"]').val();
  var password = $('.onLoggedOut input[type="password"]').val();

  fb.createUser({
    email: email,
    password: password
  }, function (err, userData) {
    if (err) {
      alert(err.toString());
    } else {
      clearForms();
      doLogin(email, password, function () {
        // window.location.reload();
      });
    }
  });

  event.preventDefault();
});
////////old doRegister form///////
// $('.doRegister').click(function () {
//   var email = $('.onLoggedOut input[type="email"]').val();
//   var password = $('.onLoggedOut input[type="password"]').val();

//   fb.createUser({
//     email: email,
//     password: password
//   }, function (err, userData) {
//     if (err) {
//       alert(err.toString());
//     } else {
//       doLogin(email, password);
//     }
//   });

//   event.preventDefault();
// });
/////////////end old Register form//////

$('.onLoggedOut form').submit(function () {
  var email = $('.onLoggedOut input[type="email"]').val();
  var password = $('.onLoggedOut input[type="password"]').val();

  doLogin(email, password, function () {
    window.location.reload();
  });
  event.preventDefault();
});

function clearForms () {
  $('input[type="text"], input[type="url"]').val('');
}

function saveAuthData (authData) {
  var ref = fb.child(`users/${authData.uid}/profile`);
  ref.set(authData);
}
//////Original loggout, clear login, doLogin, Save Auth/////
// $('.onLoggedOut form').submit(function () {
//   var email = $('.onLoggedOut input[type="email"]').val();
//   var password = $('.onLoggedOut input[type="password"]').val();

//   doLogin(email, password);
//   event.preventDefault();
// });

// function clearLoginForm () {
//   $('input[type="email"]').val('');
//   $('input[type="password"]').val('');
// }

// function saveAuthData (authData) {
//   $.ajax({
//     method: 'PUT',
//     url: `${FIREBASE_URL}/users/${authData.uid}/profile.json`,
//     data: JSON.stringify(authData)
//   });
//   authData = authData;
// }
///////end original loggout, clear login, do login, save auth////


///////this is like a template, only need to change the divs//
function doLogin (email, password, cb) {
  fb.authWithPassword({
    email: email,
    password: password
  }, function (err, authData) {
    if (err) {
      alert(err.toString());
    } else {
      saveAuthData(authData);
      typeof cb === 'function' && cb(authData);
      movieFirebase();
    }
  });
}

