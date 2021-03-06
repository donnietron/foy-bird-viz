(function () {
  angular
    .module('bird-list')
    .directive('birdList', ['monthNameFilter', function (monthNameFilter) {
      return {
        replace: true,
        restrict: 'E',
        scope: {
          year: '=',
          birdName: '@',
          reverse: '@',
          lifers: '@',
          showDiff: '@',
          drawerState: '=',
          select: '&', //invoke method on parent scope
          refresh: '&',
          selectedMonths: '='
        },
        templateUrl: 'allbirds.html',
        link: function (scope, element, attr) {
          scope.loading = false;

          scope.formatMonth = function (month) {
            //console.log('formatMonth');
            return monthNameFilter(month);
          };
          scope.isMonthHidden = function (month) {
            month = scope.formatMonth(month).toLowerCase();
            return scope.selectedMonths.length && !_.find(scope.selectedMonths, function (it) {
                return it.month == month;
              });
          };

          scope.doRefresh = function () {
            scope.loading = true;
            scope.refresh({y:scope.year});
          };
        }
      };
    }]);
})();