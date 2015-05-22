fb.onAuth(function (authData) {
  var onLoggedOut = $('.onLoggedOut');
  var onLoggedIn = $('.onLoggedIn');
  var onTempPassword = $('.onTempPassword');
  var movieInfo = $('.movie-info');
  var movieList = $('.movie-list');

  if (authData && authData.password.isTemporaryPassword) {
    onTempPassword.removeClass('hidden');
    onLoggedIn.addClass('hidden');
    onLoggedOut.addClass('hidden');
    movieInfo.removeClass('hidden');
    movieList.removeClass('hidden');
  } else if (authData) {
    onLoggedIn.removeClass('hidden');
    movieInfo.removeClass('hidden');
    movieList.removeClass('hidden');
    onLoggedOut.addClass('hidden');
    onTempPassword.addClass('hidden');
    $('.onLoggedIn h1').text(`Hello ${authData.password.email}`);
  } else {
    onLoggedOut.removeClass('hidden');
    onLoggedIn.addClass('hidden');
    onTempPassword.addClass('hidden');
    movieInfo.addClass('hidden');
    movieList.addClass('hidden');
  }

  clearLoginForm();
});
