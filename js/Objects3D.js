// 3D Objects
//=====================================================================================================



// 3D object class
//=====================================================================================================
function Object_3DClass(){  
        this._geometry = new THREE.BoxGeometry( 1, 1, 1 );
        this._material = new THREE.MeshBasicMaterial( { color: 0xff00ff } );
        this._mesh = new THREE.Mesh( this._geometry, this._material );
}
//Get 3D mesh
Object_3DClass.prototype.getMesh = function() {
    return this._mesh;
}

//Animate Object
Object_3DClass.prototype.animateFrame = function() {
    this._mesh.rotation.x += 0.01;
    this._mesh.rotation.y += 0.01;
}
Object_3DClass.prototype.setPosition = function(x,y,z) {
    this._mesh.position.set(x,y,z);
}
// END 3D object class
//=====================================================================================================




// 3D Cube class
//=====================================================================================================
function Cube(){  
        this._geometry = new THREE.BoxGeometry( 1, 1, 1 );
        this._material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this._mesh = new THREE.Mesh( this._geometry, this._material );
}
inheritsFrom(Cube, Object_3DClass)
// END OF 3D Cube class
//=====================================================================================================






// 3D JSON Model class
//=====================================================================================================
function Object_3D_JSON(){  

        // instantiate a loader
        this._loader = new THREE.JSONLoader();
    

       
}
inheritsFrom(Object_3D_JSON, Object_3DClass);
//loadModel
Object_3D_JSON.prototype.loadModel = function(whenReady_Fn) {
    //   _geometry = this._geometry;
    var self = this;
     // load a resource
        this._loader.load(
            // resource URL
            'resources/object.json',
            // Function when resource is loaded
            function ( geometry, materials ) {
                console.log("loading");
                // this._material = new THREE.MultiMaterial( materials );
                self._material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
                self._mesh = new THREE.Mesh( geometry , materials );
                self._geometry = geometry;
                
                // self._mesh = new THREE.BoxGeometry( 2, 1, 1 );
                self._geometry = new THREE.BoxGeometry( 2, 3, 3 );
                self._material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
                self._mesh = new THREE.Mesh( this._geometry, this._material );
                console.log("loading will be over");
                whenReady_Fn();
                // scene.add( this._mesh );
            },
            //onProgress
            function(){},
             //onError
            function(){
                 console.log("resource not found");
            }
        );
}
// END OF 3D JSON Model class
//=====================================================================================================


