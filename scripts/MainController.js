(function() {

    'use strict';

    angular
        .module('formlyApp')
        .controller('MainController', MainController)

        .service('formlyService', function( province,$localStorage,$firebaseObject) {

            var localformstore = $localStorage.$default({
                f1 :  [
                    {
                        type:'helloInput'
                    },
                    {
                        key: 'first_name',
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: 'First Name',
                            placeholder: 'Enter your first name',
                            required: true
                        }
                    },
                    {
                        key: 'last_name',
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: 'Last Name',
                            placeholder: 'Enter your last name',
                            required: true
                        }
                    },
                    {
                        key: 'email',
                        type: 'input',
                        templateOptions: {
                            type: 'email',
                            label: 'Email address',
                            placeholder: 'Enter email',
                            required: true
                        }
                    },
                    {
                        key: 'under25',
                        type: 'checkbox',
                        templateOptions: {
                            label: 'Are you under 25?'
                        },
                        // Hide this field if we don't have
                        // any valid input in the email field
                        hideExpression: '!model.email'
                    },
                    {
                        key: 'province',
                        type: 'select',
                        templateOptions: {
                            label: 'Province/Territory',
                            // Call our province service to get a list
                            // of provinces and territories
                            options: province.getFieldInfo()
                        },
                        hideExpression: '!model.email'
                    },
                    {
                        key: 'insurance',
                        type: 'input',
                        templateOptions: {
                            label: 'Insurance Policy Number',
                            placeholder: 'Enter your insurance policy number'
                        },
                        hideExpression: '!model.under25 || !model.province'
                    },
                    {
                        key: 'license',
                        type: 'input',
                        templateOptions: {
                            label: 'Driver\'s License Number',
                            placeholder: 'Enter your drivers license number'
                        },
                        hideExpression: '!model.province',
                        validators: {
                            // Custom validator to check whether the driver's license
                            // number that the user enters is valid or not
                            driversLicense: function($viewValue, $modelValue, scope) {
                                var value = $modelValue || $viewValue;
                                if(value) {
                                    // call the validateDriversLicense function
                                    // which either returns true or false
                                    // depending on whether the entry is valid
                                    return validateDriversLicence(value)
                                }
                            }
                        },
                        expressionProperties:{
                            // We currently only have a driver's license pattern for Ontario
                            // so we need to disable this field if we've picked a province/territory
                            // other than Ontario
                            'templateOptions.disabled': function($viewValue, $modelValue, scope) {
                                if(scope.model.province === 'ontario') {
                                    return false;
                                }
                                return true;
                            }
                        }
                    },
                ],
                ///Form 2
                f2:[
                    {
                        type:'helloInput'
                    },
                    {
                        key: 'first_name',
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: 'Nick Name',
                            placeholder: 'Enter your first name',
                            required: true
                        }
                    },
                    {
                        key: 'last_name',
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: 'Last Name',
                            placeholder: 'Enter your last name',
                            required: true
                        }
                    },
                    {
                        key: 'email',
                        type: 'input',
                        templateOptions: {
                            type: 'email',
                            label: 'Email address',
                            placeholder: 'Enter email',
                            required: true
                        }
                    },
                    {
                        key: 'under25',
                        type: 'checkbox',
                        templateOptions: {
                            label: 'Are you under 25?'
                        },
                        // Hide this field if we don't have
                        // any valid input in the email field
                        hideExpression: '!model.email'
                    },
                    {
                        key: 'province',
                        type: 'select',
                        templateOptions: {
                            label: 'Province/Territory',
                            // Call our province service to get a list
                            // of provinces and territories
                            options: province.getFieldInfo()
                        },
                        hideExpression: '!model.email'
                    },
                    {
                        key: 'insurance',
                        type: 'input',
                        templateOptions: {
                            label: 'Insurance Policy Number',
                            placeholder: 'Enter your insurance policy number'
                        },
                        hideExpression: '!model.under25 || !model.province'
                    },
                    {
                        key: 'license',
                        type: 'input',
                        templateOptions: {
                            label: 'Driver\'s License Number',
                            placeholder: 'Enter your drivers license number'
                        },
                        hideExpression: '!model.province',
                        validators: {
                            // Custom validator to check whether the driver's license
                            // number that the user enters is valid or not
                            driversLicense: function($viewValue, $modelValue, scope) {
                                var value = $modelValue || $viewValue;
                                if(value) {
                                    // call the validateDriversLicense function
                                    // which either returns true or false
                                    // depending on whether the entry is valid
                                    return validateDriversLicence(value)
                                }
                            }
                        },
                        expressionProperties:{
                            // We currently only have a driver's license pattern for Ontario
                            // so we need to disable this field if we've picked a province/territory
                            // other than Ontario
                            'templateOptions.disabled': function($viewValue, $modelValue, scope) {
                                if(scope.model.province === 'ontario') {
                                    return false;
                                }
                                return true;
                            }
                        }
                    },
                ],
                f3:[
                    {
                        type:'helloInput'
                    },
                    {
                        key: 'nick_name',
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: 'Nick Name',
                            placeholder: 'Enter your Nick Name',
                            required: true
                        }
                    },
                    {
                        key: 'spy_name',
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: 'Spy Name',
                            placeholder: 'Enter your Spy Name',
                            required: true
                        }
                    },
                    {
                        key: 'secret_email',
                        type: 'input',
                        templateOptions: {
                            type: 'email',
                            label: 'Secret Email address',
                            placeholder: 'Enter secret email',
                            required: true
                        }
                    },
                    {
                        key: 'alive',
                        type: 'checkbox',
                        templateOptions: {
                            label: 'Are you alive?'
                        },
                        // Hide this field if we don't have
                        // any valid input in the email field
                        hideExpression: '!model.email'
                    },
                    {
                        key: 'province',
                        type: 'select',
                        templateOptions: {
                            label: 'Province/Territory',
                            // Call our province service to get a list
                            // of provinces and territories
                            options: province.getFieldInfo()
                        },
                        hideExpression: '!model.email'
                    },
                    {
                        key: 'boss_name',
                        type: 'input',
                        templateOptions: {
                            label: 'Boss Number',
                            placeholder: 'Enter your Boss number'
                        },
                        hideExpression: '!model.under25 || !model.province'
                    },
                    {
                        key: 'killer_license',
                        type: 'input',
                        templateOptions: {
                            label: 'Killer\'s License Number',
                            placeholder: 'Enter your killer license number'
                        },
                        hideExpression: '!model.province'
                    }
                ]// Form/
            });

            //Firebase connection
            var config = {
                apiKey: "AIzaSyAkmJZ8y74U2Y2U5VQVwg8y4FtKu1w1PQY",
                authDomain: "angularjs-formly.firebaseapp.com",
                databaseURL: "https://angularjs-formly.firebaseio.com",
                projectId: "angularjs-formly",
                storageBucket: "angularjs-formly.appspot.com",
                messagingSenderId: "432183772236"
            };

            firebase.initializeApp(config);
            const rootRef = firebase.database().ref();
            //const ref = rootRef.child('object');
            var obj = $firebaseObject(rootRef);

            //Function to get the form info
            this.GetForm = function(id){
                return localformstore[id];
            };

            //Function to get the field info
            this.GetFieldInfo = function(id,fieldName){

            };

            //Function to submit form
            this.SubmitForm = function(formId, jsonFormData){

            }


        })

        ////////////////////////////////////////////////////////////////////////////////////////////////////

        .run(function(formlyConfig){
            formlyConfig.setType({
                name: 'helloInput',
                templateUrl: 'greeting.html'
            })
        })

    function MainController(formlyService) {

        var vm = this;

        vm.rental = {};

        vm.rentalFields = formlyService.GetForm("f3");

        function validateDriversLicence(value) {
            return /[A-Za-z]\d{4}[\s|\-]*\d{5}[\s|\-]*\d{5}$/.test(value);
        }


    }
})();