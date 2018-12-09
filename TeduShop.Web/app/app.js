/// <reference path="/Assets/admin/libs/angular/angular.js" />
(function () {
    angular.module('tedushop',
                  ['tedushop.products',
                    'tedushop.product_categories',
                   'tedushop.common'])
                  .config(config);//b2

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: "/admin",
            templateUrl: "/app/components/home/homeView.html",
            controller: "homeController"
        });
        $urlRouterProvider.otherwise('/admin');// ko co truong hop nao thi tra ve null
    }
})();
