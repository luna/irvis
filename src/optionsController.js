(function () {
  if (!window.IRVis) window.IRVis = {};

  var init = function (root, graphCtrl) {
    var showStars = root.find("#show-stars");
    var updateOptions = function () {
      var opts = {
        showStars: showStars.is(":checked")
      };
      graphCtrl.setOptions(opts);
    };
    showStars.on("change", updateOptions);
  };

  IRVis.optionsController = init;
})();
