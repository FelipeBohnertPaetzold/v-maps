# v-maps
[![Build Status](https://travis-ci.org/FelipeBohnertPaetzold/v-maps.svg?branch=master)](https://travis-ci.org/FelipeBohnertPaetzold/v-maps)
<a href="https://npmcharts.com/compare/v-maps?minimal=true"><img src="https://img.shields.io/npm/dm/v-maps.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/v-maps"><img src="https://img.shields.io/npm/v/v-maps.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/v-maps"><img src="https://img.shields.io/npm/l/v-maps.svg" alt="License"></a>

A simple Google Maps component for Vue

#### [Live Demo](https://felipebohnertpaetzold.github.io/v-maps)

### Install
run:

    yarn add v-maps
or:
    
    npm install v-maps --save
### Usage

- Globally registration:
    
    ```js
      import Vue from 'vue'
      import VMaps from 'v-maps'
      
      // { key: string, version?: string, libraries?: Array<string> }
      const googleApiOptions = {key: 'YOUR_GOOGLE_MAPS_API_KEY'}
      Vue.use(VMaps, googleApiOptions)
    ```
    - using global registration in component
    
    ```vue
    <template>
      <v-map :center="{lat: -23.4070511, lng: -51.9428867}" />
    </template>
    ```
    - using global registration map with markers
    
    ```vue
    <template>
      <v-map :center="center">
        <v-marker :position="center" />
      </v-map>
    </template>
  
    <script>
      export default {
        computed: {
          center() {
            return { lat: -23.4070511, lng: -51.9428867 }
          }        
        }
      }
    </script>
    ```
    
  - using global registration map with polygon
  ```vue
  <template>
    <v-map :center="center">
      <v-polygon :paths="polygonPaths" />
    </v-map>
  </template>
  
  <script>
    export default {
      data() {
        return { polygonPaths: [] }
      },
    }
  </script>
  ```

- Locally registration
   
   ```vue
   <template>
     <v-map :center="center" api-key="YOUR_GOOGLE_MAPS_API_KEY">
       <v-marker :position="center" />
       <v-polygon :paths="polygonPaths" />
     </v-map>
   </template>

   <script>
     import { VMap, VMarker, VPolygon } from 'v-maps'
   
     export default {
       data() {
         return { polygonPaths: [] }
       },

       computed: {
         center() {
           return { lat: -23.4070511, lng: -51.9428867 }
         }        
       },
       components: { VMarker, VMap, VPolygon }
     }
   </script>
   ```
### Props

 - v-map

    | Property    |  Required |  Type   |  Default | Description
    |-------------|-----------|---------|----------|----------------
    | center      | yes       | Object  |          | The center position for map ```{ lat: -45.2121, lng: -43.2131 }```
    | api-key     | no        | String  |          | Your api key for google maps
    | api-options | no        | Object  | {}       | Options to configure your google, libraries, version ...
    | zoom        | no        | Number  | 4        | The zoom level  
    | map-id      | no        | String  | map      | ID of the div on which the map will be mounted
    | options     | no        | Object  | {}       | Options for map (https://developers.google.com/maps/documentation/javascript/tutorial#MapOptions)

 - v-marker

    | Property    |  Required |  Type   |  Default | Description
    |-------------|-----------|---------|----------|-----------------
    | position    | yes       | Object  |          | The marker position ```{ lat: -45.2121, lng: -43.2131 }```
    | options     | no        | Object  | {}       | Options for marker (https://developers.google.com/maps/documentation/javascript/markers)
    | info-window | no        | String  |          | Info view popup for marker (https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple)
  
 - v-polygon
    
    | Property    |  Required |  Type   |  Default | Description
    |-------------|-----------|---------|----------|-----------------
    | paths       | yes       | Array   |          | Array of objects ```[{ lat: -23.407056, lng: -51.9428867}]```
    | draggable   | no        | Boolean | false    | Allows to drag polygon
    | editable    | no        | Boolean | false    | Allows to edit polygon's vertexes
    | strokeColor | no        | String  | #00ff00  | Polygon's stroke color
    | fillColor   | no        | String  | #00ff00  | Polygon's inner color
    | options     | no        | Object  | {}       | Other options for polygons (https://developers.google.com/maps/documentation/javascript/reference/polygon#PolygonOptions)

### Events

- v-map(for more details check the google documentation in https://developers.google.com/maps/documentation/javascript/events)
    
    | Vue Event          | Params                  | Native google map event
    |--------------------|-------------------------|------------------------
    | bounds-changed     | map, event              | bounds_changed
    | center-changed     | map, event              | center_changed
    | click              | map, event              | click
    | double-click       | map, event              | dblclick
    | drag               | map, event              | drag
    | drag-end           | map, event              | dragend
    | drag-start         | map, event              | dragstart
    | heading-changed    | map, event              | heading_changed
    | idle               | map, event              | idle
    | map-type-id-changed| map, event              | maptypeid_changed
    | mouse-move         | map, event              | mousemove
    | mouse-out          | map, event              | mouseout
    | mouse-over         | map, event              | mouseover
    | projection-changed | map, event              | projection_changed
    | resize             | map, event              | resize
    | right-click        | map, event              | rightclick
    | tiles-loaded       | map, event              | tilesloaded
    | tilt-changed       | map, event              | tilt_changed
    | zoom-changed       | map, event              | zoom-changed

- v-polygon
    | Vue Event          | Params                  | Native google map event
    |--------------------|-------------------------|------------------------
    | path-changed       | Current paths of polygon|