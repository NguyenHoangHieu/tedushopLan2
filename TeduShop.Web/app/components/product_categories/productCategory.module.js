/// <reference path="/Assets/admin/libs/angular/angular.js" />
(function () {
    angular.module('tedushop.product_categories', ['tedushop.common']).config(config);//b3

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('product_categories', {
            url: "/product_categories",
            templateUrl: "/app/components/product_categories/productCategoryListView.html",
            controller: "productCategoryListController"
        }).state('product_categories_add', {
            url: "/product_categories_add",
            templateUrl: "/app/components/product_categories/productCategoryAddView.html",
            controller: "productCategoryAddController"
        }).state('product_categories_edit', {
            url: "/product_categories_edit/:id",
            templateUrl: "/app/components/product_categories/productCategoryEditView.html",
            controller: "productCategoryEditController"
        });
    }
})();


