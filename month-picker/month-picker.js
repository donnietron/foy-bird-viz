(function () {
  angular
    .module('month-picker')
    .directive('monthPicker', ['monthNameFilter', function (monthNameFilter) {
      return {
        replace: true,
        scope: {
          selectedMonths: "=",
          monthFilter: "=displayFilter"
        },
        templateUrl: 'monthpicker.html',
        transclude: 'monthPickerMonth',
        controller: ['$scope', function ($scope) {
          $scope.months = _.range(12).map(function(month){ return monthNameFilter(month).toLowerCase(); });

          this.selector = function (scope) {
            if (_.find($scope.selectedMonths, scope)) {
              $scope.selectedMonths = _.without($scope.selectedMonths, scope);
            }
            else {
              $scope.selectedMonths.push(scope);
            }
          };

          $scope.removeAll = function () {
            angular.forEach($scope.selectedMonths, function (month) {
              month.selected = false;
            });
            $scope.selectedMonths = [];
          }
        }]
      };
    }]);

  angular
    .module('month-picker')
    .directive('monthPickerMonth', [function () {
      return {
        replace: true,
        require: '^monthPicker',
        scope: {
          month: "="
        },
        template: "<div class='{{::month}}' ng-click='select()' ng-class='{inactive: !selected}' title='{{::month}}'>{{::month | uppercase | limitTo: 1}}</div>",
        link: function (scope, elem, attr, controller) {
          scope.selected = false;

          scope.select = function () {
            scope.selected = !scope.selected;
            controller.selector(scope);
          };
        }
      };
    }]);
})();