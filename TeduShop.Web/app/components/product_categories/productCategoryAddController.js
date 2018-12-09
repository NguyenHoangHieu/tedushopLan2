/// <reference path="/Assets/admin/libs/angular/angular.js" />
(function (app) {
    app.controller('productCategoryAddController', productCategoryAddController);

    productCategoryAddController.$inject = ['apiService', '$scope', 'nofiticationService', '$state'];

    function productCategoryAddController(apiService, $scope, nofiticationService, $state) {
        $scope.productCategory = {
            CreatedDate: new Date(),
            Status: true,
            Name: "Danh mục 111111111"
        }

        $scope.AddProductCategory = AddProductCategory;

        function AddProductCategory() {
            apiService.post('api/productcategory/create', $scope.productCategory,
                function (result) {
                    nofiticationService.displaySuccess(result.data.Name + ' đã được thêm mới.');
                    $state.go('product_categories');
                }, function (error) {
                    nofiticationService.displayError('Thêm mới không thành công.');
                });
        }
        function loadParentCategory() {
            apiService.get('api/productcategory/getallparents', null, function (result) {
                $scope.parentCategories = result.data;
            }, function () {
                console.log('Cannot get list parent');
            });
        }

        loadParentCategory();
    }

})(angular.module('tedushop.product_categories'));
