/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { getCoorArr } from './data';

// This example creates a 2-pixel-wide red polyline showing the path of
// the first trans-Pacific flight between Oakland, CA, and Brisbane,
// Australia which was made by Charles Kingsford Smith.

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById('map') as HTMLElement,
    {
      zoom: 15,
      center: { lat: 11.0233727, lng: 76.9638801 },
      mapTypeId: 'roadmap',
      disableDefaultUI: true,
    }
  );

  console.log(getCoorArr());
  const flightPlanCoordinates = getCoorArr()[0];
  const flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
    map: map,
  });

  flightPlanCoordinates.forEach((data) => {
    const marker = new google.maps.Marker({
      position: { lat: data.lat, lng: data.lng },
      map: map,
      optimized: true,
      clickable: true,
      title: 'title',
      label: '1',
    });

    const infowindow = new google.maps.InfoWindow({
      content: `${data.lat}, ${data.lng}`,
      ariaLabel: 'Uluru',
    });

    marker.addListener('click', () => {
      infowindow.open({
        anchor: marker,
        map,
      });
    });
  });

  flightPath.setMap(map);
}

declare global {
  interface Window {
    initMap: () => void;
  }
}

window.initMap = initMap;
export {};
