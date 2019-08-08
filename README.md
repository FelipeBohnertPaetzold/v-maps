# v-maps
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
    
- Locally registration
   
   ```vue
   <template>
     <v-map :center="center" api-key="YOUR_GOOGLE_MAPS_API_KEY">
       <v-marker :position="center" />
     </v-map>
   </template>

   <script>
     import { VMap, VMarker } from 'v-maps'
   
     export default {
       computed: {
         center() {
           return { lat: -23.4070511, lng: -51.9428867 }
         }        
       },
       components: { VMarker, VMap }
     }
   </script>
   ```
### Props

 - v-map

    | Property    |  Required |  Type  |  Default | Description
    |-------------|-----------|--------|----------|----------------
    | center      | yes       | Object |          | The center position for map ```{ lat: -45.2121, lng: -43.2131 }```
    | api-key     | no        | String |          | Your api key for google maps
    | api-options | no        | Object | {}       | Options to configure your google, libraries, version ...
    | zoom        | no        | Number | 4        | The zoom level  
    | map-id      | no        | String | map      | ID of the div on which the map will be mounted
    | options     | no        | Object | {}       | Options for map (https://developers.google.com/maps/documentation/javascript/tutorial#MapOptions)

 - v-marker

    | Property    |  Required |  Type  |  Default | Description
    |-------------|-----------|--------|----------|-----------------
    | position    | yes       | Object |          | The marker position ```{ lat: -45.2121, lng: -43.2131 }```
    | options     | no        | Object | {}       | Options for marker (https://developers.google.com/maps/documentation/javascript/markers)
    | info-window | no        | String |          | Info view popup for marker (https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple)

### Events

- v-map(for more details check the google documentation in https://developers.google.com/maps/documentation/javascript/events)
    
    | Vue Event          | Params | Native google map event
    |--------------------|--------|------------------------
    | bounds-changed     | map    | bounds_changed
    | center-changed     | map    | center_changed
    | click              | map    | click
    | double-click       | map    | dblclick
    | drag               | map    | drag
    | drag-end           | map    | dragend
    | drag-start         | map    | dragstart
    | heading-changed    | map    | heading_changed
    | idle               | map    | idle
    | map-type-id-changed| map    | maptypeid_changed
    | mouse-move         | map    | mousemove
    | mouse-out          | map    | mouseout
    | mouse-over         | map    | mouseover
    | projection-changed | map    | projection_changed
    | resize             | map    | resize
    | right-click        | map    | rightclick
    | tiles-loaded       | map    | tilesloaded
    | tilt-changed       | map    | tilt_changed
    | zoom-changed       | map    | zoom-changed