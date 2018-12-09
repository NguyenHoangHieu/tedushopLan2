/// <reference path="/Assets/admin/libs/angular/angular.js" />
(function (app) {
    app.controller('productCategoryListController', productCategoryListController);

    productCategoryListController.$inject = ['$scope', 'apiService', 'nofiticationService', '$ngBootbox'];

    function productCategoryListController($scope, apiService, nofiticationService, $ngBootbox) {

        $scope.productCategories = [];

        //phan trang
        $scope.page = 0;
        $scope.pagesCount = 0;
        $scope.keyword = '';
        $scope.search = search;
        $scope.getProductCategories = getProductCategories;

        $scope.deleteProductCategory = deleteProductCategory;

        function deleteProductCategory(id) {
            $ngBootbox.confirm('Bạn có chắc muốn xóa?').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                apiService.del('api/productcategory/delete', config, function () {
                    nofiticationService.displaySuccess('Xóa thành công');
                    search();
                }, function () {
                    nofiticationService.displayError('Xóa không thành công');
                })
            });
        }

        function search() {
            getProductCategories();
        }

        function getProductCategories(page) {
            page = page || 0;
            var config = {
                params: {
                    page: page,
                    keyword: $scope.keyword,
                    pageSize: 4
                }
            }

            apiService.get('/api/productcategory/getall', config, function (result) {
                if (result.data.TotalCount == 0) {
                    nofiticationService.displayWarning('không tìm thấy bản ghi nào.');
                }// else {
                //    nofiticationService.displaySuccess('đã tìm thấy ' + result.data.TotalCount + ' đã tìm thấy.');
                //}
                $scope.productCategories = result.data.Items;
                //phan trang
                $scope.page = result.data.Page;
                $scope.pagesCount = result.data.TotalPages;
                $scope.totalCount = result.data.TotalCount;

            }, function () {
                console.log('Load productcategory failed.');
            });
        }

        $scope.getProductCategories();//goi cho no chay controller
    }

})(angular.module('tedushop.product_categories'));
