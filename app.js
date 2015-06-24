(function() {

var tagsToWarn = {};

  return {
    events: {
      'app.created':'buildTags',
      'app.activated':'checkTags',
      'pane.activated':'checkTags',
      'ticket.tags.changed':'checkTags'
    },

    buildTags: function(){
      for (var i = 1; i < 11; i++) {
        var tag = "tag" + i.toString();
        var warning = tag + "warning";
        tagsToWarn[this.setting(tag)] = this.setting(warning);
      }
    },

    checkTags: function(){
      var presentTags = [];
      var tags = this.ticket().tags();
      for (var j = 0; j < tags.length; j++) {
        if (tags[j] in tagsToWarn) {
          presentTags.push(String(tagsToWarn[tags[j]]));
        }
      }
      if (presentTags.length === 0) {
        this.switchTo('clear');
      } else {
        this.switchTo('warn', {warnings: presentTags});
      }
    }
  };

}());
