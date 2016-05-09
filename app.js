$(function () {

  // badgeFactory 用来创建各种 badge
  var badgeFactory = {};

  badgeFactory['npm'] = function (text) {
    return $('<a>')
      .attr({
        href: 'https://www.npmjs.com/package/' + text
      })
      .append(
        $('<img>').attr({
          src: 'https://img.shields.io/npm/v/' + text + '.svg?style=flat-square'
        })
      );
  }

  badgeFactory['docker'] = function (text) {
    return $('<a>')
      .attr({
        href: 'https://hub.docker.com/r/wyvernnot/' + text
      }).append(
        $('<img>').attr({
          src: 'https://img.shields.io/docker/pulls/wyvernnot/' + text + '.svg?style=flat-square'
        })
      );
  }

  badgeFactory['dm'] = function (text) {
    return $('<a>')
      .attr({
        href: 'https://www.npmjs.com/package/' + text
      })
      .append(
        $('<img>').attr({
          src: 'https://img.shields.io/npm/dm/' + text + '.svg?style=flat-square'
        })
      );
  }

  badgeFactory['l'] = function (text) {
    return $('<a>')
      .attr({
        href: 'https://www.npmjs.com/package/' + text
      })
      .append(
        $('<img>').attr({
          src: 'https://img.shields.io/npm/l/' + text + '.svg?style=flat-square'
        })
      );
  }

  /**
   * 在每个连接后添加各种各样的小 badge
   */
  function addBadges() {
    // 当前的连接
    var $link = $(this);
    // 兄弟 badges 结点
    var $siblines = $(this).siblings('.badges');
    if ($siblines.size() > 0) {
      var classList = $siblines.attr('class').split(' ');
      for (var i = 0; i < classList.length; i++) {
        var className = classList[i];
        if (badgeFactory[className]) {
          $siblines.append(
            badgeFactory[className]($link.text())
          );
        }
      }
    }
  }

  // 加载 README
  $.ajax({
    url: 'README.md',
    contentType: 'txt', // 以纯文本加载
    success: function (res) {
      $('#content')
        .html(marked(res))
        .find('a')
        .attr({
          target: '_blank'
        }).each(addBadges)
    }
  });
});
