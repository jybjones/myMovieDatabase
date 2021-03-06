fb.onAuth(function (authData) {
/////add initLoad here///
  if (initLoad) {
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
    //logged in//
    onLoggedIn.removeClass('hidden');
    movieInfo.removeClass('hidden');
    movieList.removeClass('hidden');
    onLoggedOut.addClass('hidden');
    onTempPassword.addClass('hidden');
    $('.onLoggedIn h1').text(`Welcome ${authData.password.email} , search a MeowVIE`);
  } else {
    onLoggedOut.removeClass('hidden');
    onLoggedIn.addClass('hidden');
    onTempPassword.addClass('hidden');
    movieInfo.addClass('hidden');
    movieList.addClass('hidden');
  }
}
    initLoad = false;
  // clearLoginForm();
});
