angular
    .module('app', ['ui.sortable'])
    .controller('appController', ['$scope', 'StorageService', function($scope, storage) {

        var colors = [
            {name: 'apple', color: '#fc1770'},
            {name: 'tangerine', color: '#ff7f36'},
            {name: 'banana', color: '#fff261'},
            {name: 'kermit', color: '#94ca3d'},
            {name: 'sky', color: '#15c5ec'},
            {name: 'berry', color: '#c657af'},
            {name: 'light', color: '#E3E9EC'},
            {name: 'dark', color: '#23292C'}
        ];

        $scope.headline = 'Dashboard';
        $scope.icon = 'tachometer';

        $scope.dragControlListeners = {
            accept: function () {
                return true; //override to determine drag is allowed or not. default is true.
            },
            dragEnd: function(item){
                if(item.source.index !== item.dest.index) {
                    var navs = angular.copy($scope.navs);
                    navs.move(navs[item.source.index], navs[item.dest.index]);
                }
            },
            containment: '.omni-nav-grid'
        };

    }])
    .directive('scrollTo', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            scope: {
                target: '@scrollTo',
                delay: '@scrollToDelay'
            },
            link: function(scope, $element) {
                var delay = scope.delay ? scope.delay : 0;
                $element.on('click', function($event) {
                    $timeout(function(){
                        $(".nav-mode").scrollTo($(scope.target), 300);
                    }, delay);
                });
            }
        };
    }])
    .factory('StorageService', function () {
        return {
            /**
             * get item out of local storage and if it's a string, turn it into a json object
             * @param key
             * @returns {*}
             */
            get: function (key) {
                var item = localStorage.getItem(key);
                if (item && _.isString(item) && _.isEmpty(item) === false) {
                    return angular.fromJson(item);
                } else {
                    return item;
                }
            },

            /**
             * save object as a json string
             * @param key
             * @param data
             */
            save: function (key, data) {
                localStorage.setItem(key, JSON.stringify(data));
            },

            /**
             * remove a specific item
             * @param key
             */
            remove: function (key) {
                localStorage.removeItem(key);
            },

            /**
             * blow them all away
             */
            clearAll : function () {
                localStorage.clear();
            }
        };
    });
