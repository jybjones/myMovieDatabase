//////login/logout/////
//Javascript Login and Registration//
//login: a@abc.com, password: abc created from firebase//

'use strict';

$('.onTempPassword form').submit(function () {
  var email = fb.getAuth().password.email;
  var oldPw = $('.onTempPassword input:nth-child(1)').val();
  var newPw = $('.onTempPassword input:nth-child(2)').val();

  fb.changePassword({
    email: email,
    oldPassword: oldPw,
    newPassword: newPw
  }, function (err) {
    if (err) {
      alert(err.toString());
    } else {
      fb.unauth();
    }
  });

  event.preventDefault();
});

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
});

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
      doLogin(email, password, function () {});
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

function clearForms() {
  $('input[type="text"], input[type="url"]').val('');
}

function saveAuthData(authData) {
  var ref = fb.child('users/' + authData.uid + '/profile');
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
function doLogin(email, password, cb) {
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

// window.location.reload();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9qcy9sb2dpbl9yZWdpc3RyYXRpb25fZnVuY3Rpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZO0FBQzNDLE1BQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0FBQ3hDLE1BQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFELE1BQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDOztBQUUxRCxJQUFFLENBQUMsY0FBYyxDQUFDO0FBQ2hCLFNBQUssRUFBRSxLQUFLO0FBQ1osZUFBVyxFQUFFLEtBQUs7QUFDbEIsZUFBVyxFQUFFLEtBQUs7R0FDbkIsRUFBRSxVQUFTLEdBQUcsRUFBRTtBQUNmLFFBQUksR0FBRyxFQUFFO0FBQ1AsV0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZCLE1BQU07QUFDTCxRQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDYjtHQUNGLENBQUMsQ0FBQzs7QUFFSCxPQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Q0FDeEIsQ0FBQyxDQUFBOztBQUVGLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZO0FBQ3RDLE1BQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDOztBQUV4RCxJQUFFLENBQUMsYUFBYSxDQUFDO0FBQ2YsU0FBSyxFQUFFLEtBQUs7R0FDYixFQUFFLFVBQVUsR0FBRyxFQUFFO0FBQ2hCLFFBQUksR0FBRyxFQUFFO0FBQ1AsV0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZCLE1BQU07QUFDTCxXQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztLQUM1QjtHQUNGLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQzs7QUFFSCxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVk7QUFDL0IsSUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ1osVUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDL0IsQ0FBQyxDQUFBOztBQUdILENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWTtBQUNqQyxNQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN4RCxNQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMscUNBQXFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7QUFFOUQsSUFBRSxDQUFDLFVBQVUsQ0FBQztBQUNaLFNBQUssRUFBRSxLQUFLO0FBQ1osWUFBUSxFQUFFLFFBQVE7R0FDbkIsRUFBRSxVQUFVLEdBQUcsRUFBRSxRQUFRLEVBQUU7QUFDMUIsUUFBSSxHQUFHLEVBQUU7QUFDUCxXQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDdkIsTUFBTTtBQUNMLGdCQUFVLEVBQUUsQ0FBQztBQUNiLGFBQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFFcEMsQ0FBQyxDQUFDO0tBQ0o7R0FDRixDQUFDLENBQUM7O0FBRUgsT0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0NBQ3hCLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJILENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZO0FBQ3hDLE1BQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3hELE1BQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDOztBQUU5RCxTQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxZQUFZO0FBQ25DLFVBQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7R0FDMUIsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0NBQ3hCLENBQUMsQ0FBQzs7QUFFSCxTQUFTLFVBQVUsR0FBSTtBQUNyQixHQUFDLENBQUMsdUNBQXVDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDcEQ7O0FBRUQsU0FBUyxZQUFZLENBQUUsUUFBUSxFQUFFO0FBQy9CLE1BQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxLQUFLLFlBQVUsUUFBUSxDQUFDLEdBQUcsY0FBVyxDQUFDO0FBQ3BELEtBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJELFNBQVMsT0FBTyxDQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFO0FBQ3JDLElBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztBQUNsQixTQUFLLEVBQUUsS0FBSztBQUNaLFlBQVEsRUFBRSxRQUFRO0dBQ25CLEVBQUUsVUFBVSxHQUFHLEVBQUUsUUFBUSxFQUFFO0FBQzFCLFFBQUksR0FBRyxFQUFFO0FBQ1AsV0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZCLE1BQU07QUFDTCxrQkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZCLGFBQU8sRUFBRSxLQUFLLFVBQVUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDekMsbUJBQWEsRUFBRSxDQUFDO0tBQ2pCO0dBQ0YsQ0FBQyxDQUFDO0NBQ0oiLCJmaWxlIjoibG9naW5fcmVnaXN0cmF0aW9uX2Z1bmN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLy8vL2xvZ2luL2xvZ291dC8vLy8vXG4vL0phdmFzY3JpcHQgTG9naW4gYW5kIFJlZ2lzdHJhdGlvbi8vXG4vL2xvZ2luOiBhQGFiYy5jb20sIHBhc3N3b3JkOiBhYmMgY3JlYXRlZCBmcm9tIGZpcmViYXNlLy9cblxuJCgnLm9uVGVtcFBhc3N3b3JkIGZvcm0nKS5zdWJtaXQoZnVuY3Rpb24gKCkge1xuICB2YXIgZW1haWwgPSBmYi5nZXRBdXRoKCkucGFzc3dvcmQuZW1haWw7XG4gIHZhciBvbGRQdyA9ICQoJy5vblRlbXBQYXNzd29yZCBpbnB1dDpudGgtY2hpbGQoMSknKS52YWwoKTtcbiAgdmFyIG5ld1B3ID0gJCgnLm9uVGVtcFBhc3N3b3JkIGlucHV0Om50aC1jaGlsZCgyKScpLnZhbCgpO1xuXG4gIGZiLmNoYW5nZVBhc3N3b3JkKHtcbiAgICBlbWFpbDogZW1haWwsXG4gICAgb2xkUGFzc3dvcmQ6IG9sZFB3LFxuICAgIG5ld1Bhc3N3b3JkOiBuZXdQd1xuICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBhbGVydChlcnIudG9TdHJpbmcoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZiLnVuYXV0aCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn0pXG5cbiQoJy5kb1Jlc2V0UGFzc3dvcmQnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gIHZhciBlbWFpbCA9ICQoJy5vbkxvZ2dlZE91dCBpbnB1dFt0eXBlPVwiZW1haWxcIl0nKS52YWwoKTtcblxuICBmYi5yZXNldFBhc3N3b3JkKHtcbiAgICBlbWFpbDogZW1haWxcbiAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGFsZXJ0KGVyci50b1N0cmluZygpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoJ0NoZWNrIHlvdXIgZW1haWwhJyk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG4kKCcuZG9Mb2dvdXQnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gIGZiLnVuYXV0aCgpO1xuICBkb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XG4gfSlcblxuXG4kKCcuZG9SZWdpc3RlcicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGVtYWlsID0gJCgnLm9uTG9nZ2VkT3V0IGlucHV0W3R5cGU9XCJlbWFpbFwiXScpLnZhbCgpO1xuICB2YXIgcGFzc3dvcmQgPSAkKCcub25Mb2dnZWRPdXQgaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJykudmFsKCk7XG5cbiAgZmIuY3JlYXRlVXNlcih7XG4gICAgZW1haWw6IGVtYWlsLFxuICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICB9LCBmdW5jdGlvbiAoZXJyLCB1c2VyRGF0YSkge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGFsZXJ0KGVyci50b1N0cmluZygpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xlYXJGb3JtcygpO1xuICAgICAgZG9Mb2dpbihlbWFpbCwgcGFzc3dvcmQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG4vLy8vLy8vL29sZCBkb1JlZ2lzdGVyIGZvcm0vLy8vLy8vXG4vLyAkKCcuZG9SZWdpc3RlcicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbi8vICAgdmFyIGVtYWlsID0gJCgnLm9uTG9nZ2VkT3V0IGlucHV0W3R5cGU9XCJlbWFpbFwiXScpLnZhbCgpO1xuLy8gICB2YXIgcGFzc3dvcmQgPSAkKCcub25Mb2dnZWRPdXQgaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJykudmFsKCk7XG5cbi8vICAgZmIuY3JlYXRlVXNlcih7XG4vLyAgICAgZW1haWw6IGVtYWlsLFxuLy8gICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuLy8gICB9LCBmdW5jdGlvbiAoZXJyLCB1c2VyRGF0YSkge1xuLy8gICAgIGlmIChlcnIpIHtcbi8vICAgICAgIGFsZXJ0KGVyci50b1N0cmluZygpKTtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgZG9Mb2dpbihlbWFpbCwgcGFzc3dvcmQpO1xuLy8gICAgIH1cbi8vICAgfSk7XG5cbi8vICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbi8vIH0pO1xuLy8vLy8vLy8vLy8vL2VuZCBvbGQgUmVnaXN0ZXIgZm9ybS8vLy8vL1xuXG4kKCcub25Mb2dnZWRPdXQgZm9ybScpLnN1Ym1pdChmdW5jdGlvbiAoKSB7XG4gIHZhciBlbWFpbCA9ICQoJy5vbkxvZ2dlZE91dCBpbnB1dFt0eXBlPVwiZW1haWxcIl0nKS52YWwoKTtcbiAgdmFyIHBhc3N3b3JkID0gJCgnLm9uTG9nZ2VkT3V0IGlucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpLnZhbCgpO1xuXG4gIGRvTG9naW4oZW1haWwsIHBhc3N3b3JkLCBmdW5jdGlvbiAoKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9KTtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG5mdW5jdGlvbiBjbGVhckZvcm1zICgpIHtcbiAgJCgnaW5wdXRbdHlwZT1cInRleHRcIl0sIGlucHV0W3R5cGU9XCJ1cmxcIl0nKS52YWwoJycpO1xufVxuXG5mdW5jdGlvbiBzYXZlQXV0aERhdGEgKGF1dGhEYXRhKSB7XG4gIHZhciByZWYgPSBmYi5jaGlsZChgdXNlcnMvJHthdXRoRGF0YS51aWR9L3Byb2ZpbGVgKTtcbiAgcmVmLnNldChhdXRoRGF0YSk7XG59XG4vLy8vLy9PcmlnaW5hbCBsb2dnb3V0LCBjbGVhciBsb2dpbiwgZG9Mb2dpbiwgU2F2ZSBBdXRoLy8vLy9cbi8vICQoJy5vbkxvZ2dlZE91dCBmb3JtJykuc3VibWl0KGZ1bmN0aW9uICgpIHtcbi8vICAgdmFyIGVtYWlsID0gJCgnLm9uTG9nZ2VkT3V0IGlucHV0W3R5cGU9XCJlbWFpbFwiXScpLnZhbCgpO1xuLy8gICB2YXIgcGFzc3dvcmQgPSAkKCcub25Mb2dnZWRPdXQgaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJykudmFsKCk7XG5cbi8vICAgZG9Mb2dpbihlbWFpbCwgcGFzc3dvcmQpO1xuLy8gICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuLy8gfSk7XG5cbi8vIGZ1bmN0aW9uIGNsZWFyTG9naW5Gb3JtICgpIHtcbi8vICAgJCgnaW5wdXRbdHlwZT1cImVtYWlsXCJdJykudmFsKCcnKTtcbi8vICAgJCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJykudmFsKCcnKTtcbi8vIH1cblxuLy8gZnVuY3Rpb24gc2F2ZUF1dGhEYXRhIChhdXRoRGF0YSkge1xuLy8gICAkLmFqYXgoe1xuLy8gICAgIG1ldGhvZDogJ1BVVCcsXG4vLyAgICAgdXJsOiBgJHtGSVJFQkFTRV9VUkx9L3VzZXJzLyR7YXV0aERhdGEudWlkfS9wcm9maWxlLmpzb25gLFxuLy8gICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGF1dGhEYXRhKVxuLy8gICB9KTtcbi8vICAgYXV0aERhdGEgPSBhdXRoRGF0YTtcbi8vIH1cbi8vLy8vLy9lbmQgb3JpZ2luYWwgbG9nZ291dCwgY2xlYXIgbG9naW4sIGRvIGxvZ2luLCBzYXZlIGF1dGgvLy8vXG5cblxuLy8vLy8vL3RoaXMgaXMgbGlrZSBhIHRlbXBsYXRlLCBvbmx5IG5lZWQgdG8gY2hhbmdlIHRoZSBkaXZzLy9cbmZ1bmN0aW9uIGRvTG9naW4gKGVtYWlsLCBwYXNzd29yZCwgY2IpIHtcbiAgZmIuYXV0aFdpdGhQYXNzd29yZCh7XG4gICAgZW1haWw6IGVtYWlsLFxuICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICB9LCBmdW5jdGlvbiAoZXJyLCBhdXRoRGF0YSkge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGFsZXJ0KGVyci50b1N0cmluZygpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2F2ZUF1dGhEYXRhKGF1dGhEYXRhKTtcbiAgICAgIHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJyAmJiBjYihhdXRoRGF0YSk7XG4gICAgICBtb3ZpZUZpcmViYXNlKCk7XG4gICAgfVxuICB9KTtcbn1cblxuIl19