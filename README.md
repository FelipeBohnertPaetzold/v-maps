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
      
      Vue.use(VMaps)
    ```
    - using global registration in component
    
    ```vue
    <template>
      <v-map :center="{lat: -23.4070511, lng: -51.9428867}" api-key="YOUR_GOOGLE_MAPS_API_KEY" />
    </template>
    ```
    - using global registration map with markers
    
    ```vue
    <template>
      <v-map :center="center" api-key="YOUR_GOOGLE_MAPS_API_KEY">
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
### Properties

 - v-map

    | Property  |  Required |  Type |  Default | Description
    |---|---|---|---|---
    |  apiKey |  yes  |  String |  | Your api key for google maps
    | zoom | no | Number | 4 | The zoom level  
    | center | yes | Object | | The center position for map ```{ lat: -45.2121, lng: -43.2131 }```
    | mapId  |  no |  String |  map  | ID of the div on which the map will be mounted
    |  options | no  |  Object  |  {}  | Options for map (https://developers.google.com/maps/documentation/javascript/tutorial#MapOptions)

 - v-marker

    | Property  |  Required |  Type |  Default | Description
    |---|---|---|---|---
    | position | yes | Object | | The marker position ```{ lat: -45.2121, lng: -43.2131 }```
    | options | no | Object | {} | Options for marker (https://developers.google.com/maps/documentation/javascript/markers)
