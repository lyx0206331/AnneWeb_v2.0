/**! jQuery canjian 2015-06-11 **/

var delivery_margin_top = $('.container  .sidebar .delivery').css('margin-top');

SidebarFollow = function () {

    this.config = {
        element: null, // 处理的节点
        distanceToTop: 0 // 节点上边到页面顶部的距离
    };

    this.cache = {
        originalToTop: 0, // 原本到页面顶部的距离
        prevElement: null, // 上一个节点
        parentToTop: 0, // 父节点的上边到顶部距离
        placeholder: jQuery('<div>') // 占位节点
    }
};

SidebarFollow.prototype = {

    init: function (config) {
        this.config = config || this.config;
        var _self = this;
        var element = jQuery(_self.config.element);


        // 如果没有找到节点, 不进行处理
        if (element.length <= 0) {
            return;
        }

        // 获取上一个节点
        var prevElement = element.prev();
        while (prevElement.is(':hidden')) {
            prevElement = prevElement.prev();
            if (prevElement.length <= 0) {
                break;
            }
        }
        _self.cache.prevElement = prevElement;

        // 计算父节点的上边到顶部距离
        var parent = element.parent();
        var parentToTop = parent.offset().top;
        var parentBorderTop = parent.css('border-top');
        var parentPaddingTop = parent.css('padding-top');
        _self.cache.parentToTop = parentToTop + parentBorderTop + parentPaddingTop;

        // 滚动屏幕
        jQuery(window).scroll(function () {
            _self._scrollScreen({element: element, _self: _self});
        });

        // 改变屏幕尺寸
        jQuery(window).resize(function () {
            _self._scrollScreen({element: element, _self: _self});
        });
    },

    /**
     * 修改节点位置
     */
    _scrollScreen: function (args) {
        var _self = args._self;
        var element = args.element;
        var prevElement = _self.cache.prevElement;

        // 获得到顶部的距离
        var toTop = _self.config.distanceToTop;

        // 如果 body 有 top 属性, 消除这些位移
        var bodyToTop = parseInt(jQuery('body').css('top'), 10);
        if (!isNaN(bodyToTop)) {
            toTop += bodyToTop;
        }

        // 获得到顶部的绝对距离
        var elementToTop = element.offset().top - toTop;

        // 如果存在上一个节点, 获得到上一个节点的距离; 否则计算到父节点顶部的距离
        var referenceToTop = 0;
        if (prevElement && prevElement.length === 1) {
            referenceToTop = prevElement.offset().top + prevElement.outerHeight();
        } else {
            referenceToTop = _self.cache.parentToTop - toTop;
        }

        if (jQuery(document).scrollTop() == 0) { // IE7 Bug
            // 删除占位节点
            _self.cache.placeholder.remove();
            // 修改样式
            element.removeClass('hover').css('height', '60px');
        }

        // 当节点进入跟随区域, 跟随滚动
        if (jQuery(document).scrollTop() > elementToTop) {
            // 记录原位置
            _self.cache.originalToTop = elementToTop;
            // 修改样式
            element.addClass('hover').css('height', '60px');

            if (!isccate) {
                // 收起菜单
                $('#allsort').hide();
                $('.container  .sidebar .delivery').css('margin-top', '0');
                $('#category_show').html($('#allsort').html());

                // 显示菜单
                $('#category').live('mouseover', function () {
                    $('#allsort').show();
                    $('#category').live('mouseleave', function () {
                        $('#allsort').hide();
                    });
                });

            }


            // 否则回到原位
        } else if (_self.cache.originalToTop > elementToTop || referenceToTop > elementToTop) {
            //  删除占位节点
            _self.cache.placeholder.remove();
            // 修改样式
            element.removeClass('hover').css('height', '60px');

            if (!isccate) {
                // 显示菜单
                $('#allsort').show();
                $('.container  .sidebar .delivery').css('margin-top', delivery_margin_top);
            }

        }
    }
};