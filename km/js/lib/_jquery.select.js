!function(t){t.fn.customSelect=function(e){return this.each(function(){var e=t(this);e.attr("disabled")?e.wrap("<div class='custom-select-wrap custom-select-wrap_disabled'></div>"):e.wrap("<div class='custom-select-wrap'></div>"),e.before("<div class='custom-select-text'></div>");var s,i=e.parent(".custom-select-wrap"),c=i.find(".custom-select-text"),n=e.find("option").eq(0),o=n.css("display");s="none"==o?e.find("option").eq(1).text():e.find("option").eq(0).text(),c.text(s),t(this).change(function(){c.text(e.find("option:selected").text())}),t(this).focus(function(){i.addClass("focus")}),t(this).blur(function(){i.removeClass("focus")})}),this},t.fn.sinhronize=function(){var e=t(this);e.prev(".custom-select-text").text(e.find("option:selected").text())}}($);