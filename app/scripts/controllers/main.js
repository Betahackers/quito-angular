'use strict';

angular.module('quitoApp')
  .controller('MainCtrl', function ($scope, $timeout, $log, $http) {
        google.maps.visualRefresh = true;

        var versionUrl = window.location.host === "rawgithub.com" ? "http://rawgithub.com/nlaplante/angular-google-maps/master/package.json" : "/package.json";

        $http.get(versionUrl).success(function (data) {
            if (!data)
                console.error("no version object found!!");
            $scope.version = data.version;
        });

        var onMarkerClicked = function (marker) {
            marker.showWindow = true;
            $scope.$apply();
            console.log("You clicked");
        };

        angular.extend($scope, {
            map: {
                control: {},
                showTraffic: true,
                showBicycling: false,
                showWeather: false,
                showHeat: false,
                center: {
                    latitude: 41.390412,
                    longitude: 2.157952
                },
                options: {
                    streetViewControl: false,
                    panControl: false,
                    maxZoom: 20,
                    minZoom: 3
                },
                zoom: 14,
                dragging: false,
                bounds: {},
                markers: [
                    {
                        latitude: 41.390412,
                        longitude: 2.157952,
                        showWindow: false,
                        title: 'Espito Chupitos'
                    },
                    {
                        latitude: 41.385244,
                        longitude: 2.169797,
                        showWindow: false,
                        title: "L'oveja Negra"
                    },
                    {
                        latitude: 41.382555,
                        longitude: 2.163403,
                        showWindow: false,
                        title: "Fabrica Moritz"
                    }
                ],
                doClusterRandomMarkers: true,
                doUgly: true, //great name :)
                clickedMarker: {
                    title: 'You clicked here',
                    latitude: null,
                    longitude: null
                },
                events: {
                    tilesloaded: function (map, eventName, originalEventArgs) {
                    },
                    click: function (mapModel, eventName, originalEventArgs) {
                        // 'this' is the directive's scope
                        $log.log("user defined event: " + eventName, mapModel, originalEventArgs);

                        var e = originalEventArgs[0];

                        if (!$scope.map.clickedMarker) {
                            $scope.map.clickedMarker = {
                                title: 'You clicked here',
                                latitude: e.latLng.lat(),
                                longitude: e.latLng.lng()
                            };
                        }
                        else {
                            $scope.map.clickedMarker.latitude = e.latLng.lat();
                            $scope.map.clickedMarker.longitude = e.latLng.lng();
                        }

                        $scope.$apply();
                    }
                }
            },
            toggleColor: function (color) {
                return color == 'red' ? '#6060FB' : 'red';
            }

        });

        _.each($scope.map.markers, function (marker) {
            marker.closeClick = function () {
                marker.showWindow = false;
                $scope.$apply();
            };
            marker.onClicked = function () {
                onMarkerClicked(marker);
            };
        });

        $scope.refreshMap = function () {
            //optional param if you want to refresh you can pass null undefined or false or empty arg
            $scope.map.control.refresh({latitude: 41.382555, longitude: 2.163403});
            $scope.map.control.getGMap().setZoom(11);
            return;
        };
        $scope.getMapInstance = function () {
            alert("You have Map Instance of" + $scope.map.control.getGMap().toString());
            return;
        }

        $scope.onMarkerClicked = onMarkerClicked;

  });
