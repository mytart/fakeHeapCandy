$(function() {
  var $indexPage = $('body.main');
  _init();

  function _init() {
    _bind();
    _generateRecommendBlock();
  }

  function _bind() {
    $(document).on('scroll', _changeHeaderStyleWhenScroll);
    $indexPage.find('.navbar-header > button').on('click', _changeHeaderStyleWhenCollapase);
  }

  function _changeHeaderStyleWhenScroll() {
    $(this).scrollTop() > 0 ? $indexPage.find('.header').addClass('scroll-change') : $indexPage.find('.header').removeClass('scroll-change');
  }

  function _changeHeaderStyleWhenCollapase() {
    $(this).attr('aria-expanded').toLowerCase() == "false" ? $indexPage.find('header').addClass('button-collapsed') : $indexPage.find('.header').removeClass('button-collapsed');
  }

  var SingleAlbumAModel = Backbone.Model.extend({
    initialize: function(data) {
      this.set({
        title: data.title,
        author: data.author,
        collectCount: data.collectCount,
        likeCount: data.likeCount,
        imgUrl: data.imgUrl
      });
    }
  });

  var SingleAlbumCollection = Backbone.Collection.extend({
    model: SingleAlbumAModel,
    initialize: function() {
      for (var i = 0, len = elaborateAlbums.length; i < len; i++) {
        this.add(elaborateAlbums[i]);
      }
    }
  });

  var SingleAlbums = new SingleAlbumCollection();

  var SingleAlbumView = Backbone.View.extend({
    template: _.template($indexPage.find('#single-album-view').html()),
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  var AlbumsView = Backbone.View.extend({
    el: $indexPage.find('.albums'),
    initialize: function() {
      SingleAlbums.each(this.addSingle, this);
    },
    addSingle: function(singleAlbumAModel) {
      var singleView = new SingleAlbumView({
        model: singleAlbumAModel
      });
      this.$el.append(singleView.render().el);
    }
  });

  var albums = new AlbumsView();

  var recommendItem = Backbone.Model.extend({
    initialize: function(data) {
      this.set({
        title: data.title,
        userCount: data.userCount,
        imgUrl: data.imgUrl
      });
    }
  });

  var recommendItemCollection = Backbone.Collection.extend({
    model: recommendItem,
    initialize: function() {
      for (var i = 0, len = recommendItems.length; i < len; i++) {
        this.add(recommendItems[i]);
      }
    }
  });

  var recommendItemView = Backbone.View.extend({
    template: _.template($indexPage.find('#single-category-view').html()),
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  var recommends = new recommendItemCollection();

  var recommendsView = Backbone.View.extend({
    el: $indexPage.find('.recommend-product .categories'),
    initialize: function() {
      recommends.each(this.addOne, this);
    },
    addOne: function(singleRecommendModel) {
      var singleRecommendView = new recommendItemView({
        model: singleRecommendModel
      });
      this.$el.append(singleRecommendView.render().el);
    }
  });

  var recommendView = new recommendsView();

  var expertModel = Backbone.Model.extend({
    initialize: function(data) {
      this.set({
        name: data.name,
        domain: data.domain,
        stars: data.stars,
        backgroungUrl: data.backgroungUrl,
        profileUrl: data.profileUrl
      });
    }
  });

  var expertCollection = Backbone.Collection.extend({
    model: expertModel,
    initialize: function() {
      for (var i = 0, len = experts.length; i < len; i++) {
        this.add(experts[i]);
      }
    }
  });

  var singleExpertView = Backbone.View.extend({
    template: _.template($indexPage.find('#single-expert-view').html()),
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  var allExpert = new expertCollection();

  var expertsView = Backbone.View.extend({
    el: $indexPage.find('.expert-recommend .experts'),
    initialize: function() {
      allExpert.each(this.addOne, this);
    },
    addOne: function(singleExpertModel) {
      var singleExpert = new singleExpertView({
        model: singleExpertModel
      });
      this.$el.append(singleExpert.render().el);
    }
  });

  var expertBlock = new expertsView();

  function _generateRecommendBlock() {
    var $templateDiv = $indexPage.find('.recommend-and-hotpoint .item.template');
    var $templateLi = $indexPage.find('.recommend-and-hotpoint .carousel-indicators .template');
    var data = {};
    var $tempDiv = null;
    var $tempLi = null;
    var $recommendDiv = $('<div></div>');
    var $ol = $('<ol></ol>');
    for (var i = 0, len = scrollrRecommend.length; i < len; i++) {
      $tempDiv = $templateDiv.clone().removeClass('template');
      data = scrollrRecommend[i];
      $tempDiv.find('img').attr('src', data.imgUrl);
      $tempDiv.find('.carousel-caption h2').text(data.title).next('p').text(data.author);
      $recommendDiv.append($tempDiv);
      $tempLi = $templateLi.clone().removeClass('template').attr('data-slide-to', i);
      $ol.append($tempLi);
    }
    $recommendDiv.children().first().addClass('active');
    $ol.children().first().addClass('active');
    $templateDiv.parent().append($recommendDiv.children()).children().first().remove();
    $templateLi.parent().append($ol.children()).children().first().remove();
  }


});
