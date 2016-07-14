var app = angular.module('classicform', [
	'jcs-autoValidate'
]);

app.run(function (defaultErrorMessageResolver) {
		defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
			errorMessages['tooYoung'] = 'You must be at least {0} years old to use this site';
			errorMessages['tooOld'] = 'You must be {0} years old or less to use this site';
			errorMessages['badUsername'] = 'Username can only contain numbers and letters and underscore';
		});
	}
);

	function ConfirmPasswordValidatorDirective(defaultErrorMessageResolver) {
      defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
          errorMessages['confirmPassword'] = 'Please ensure the passwords match.';
        });
        
        return {
            restrict : 'A',
            require : 'ngModel',
            scope : {
                confirmPassword : '=confirmPassword'
            },
            link : function(scope, element, attributes, ngModel) {
              console.log('x');
                ngModel.$validators.confirmPassword = function(modelValue) {
                    return modelValue === scope.confirmPassword;
                };

                scope.$watch('confirmPassword', function() {
                    ngModel.$validate();
                });
            }
        };
    }
    
    ConfirmPasswordValidatorDirective.$inject = [
      'defaultErrorMessageResolver'
    ];
    
    

app.controller('ClassicFormCtrl', function ($scope, $http) {
	$scope.formModel = {};

	$scope.onSubmit = function () {

		console.log("Your data has been submitted!");
		console.log($scope.formModel);

		$http.post('https://your-api-point.com/register/', $scope.formModel).
			success(function (data) {
				console.log(":)")
			}).error(function(data) {
				console.log(":(")
			});

	};
});

app.directive('confirmPassword', ConfirmPasswordValidatorDirective);

