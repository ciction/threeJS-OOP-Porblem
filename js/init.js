// World class
// =============================================================================================================================
var World = (function () {

    // World constructor
    function World (width, height) {
        //private members
        //===========================
        this._width = width;
        this._height = height;
        this._scene = new THREE.Scene();
      
        this._camera = new THREE.PerspectiveCamera( 75, this._width / this._height, 0.1, 1000 );           
        this._camera.position.set(6.8,9.5,12.2);
        this._camera.lookAt(new THREE.Vector3(0,0,0));

        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize( this._width , this._height );                                              
        

        this._worldName = "My 3D world";
        this._object_3DList = [];

        
         return _privatePrintMessage.call(this, "created");
    }


    //public
    //===========================
    //functions
     World.prototype.getScene = function(){
        return this._scene;
    }

    World.prototype.AddWorldToPage = function(){
        document.body.appendChild( this._renderer.domElement );
    }

    World.prototype.render = function() {
        //zichzelf meegeven aan AnimationFrame
        requestAnimationFrame( this.render.bind(this) );

        this._object_3DList[0].animateFrame();
        // this._object_3DList[1].animateFrame();
        


        this._renderer.render( this._scene, this._camera );
    }
  
    World.prototype.addToScene = function(object_3DClass){

        this._scene.add( object_3DClass._mesh );
        console.log("adding object:"  + object_3DClass.constructor.name );
        this._object_3DList.push(object_3DClass);

    }
    
    World.prototype.addToSceneTemp = function(){
        _scene = this._scene;
        _object_3DList = this._object_3DList;


        //  instantiate a loader
        var loader = new THREE.JSONLoader();
        // load a resource
        loader.load(
        // resource URL
        'resources/object.json',
        // Function when resource is loaded
        function ( geometry, materials ) {
            // var material = new THREE.MultiMaterial( materials );
            var material = new THREE.MeshBasicMaterial( { color: 0xff00ff } );
            var mesh = new THREE.Mesh( geometry, material );
            _scene.add( mesh );
            _object_3DList.push(mesh);
        });
    }             
    
     

    //private functions
    //===========================
    function _privatePrintMessage (message) {
        // return prefix + this._foo;
        console.log("World class: " + this. _worldName + " " + message);
    }

    return World;
})();
// END OF World class
// =============================================================================================================================






//create world
var myWorld = new World(500,500);
myWorld.AddWorldToPage();


//load simple model in the world
var cube = new Cube();
myWorld.addToScene(cube);


// load json model in the world
//option 1
// myWorld.addToSceneTemp();

//option 2 OO (not working)
var jsonObject = new Object_3D_JSON();
function afterModelLoaded(){
    console.log("after loading is done");
    myWorld.addToScene(jsonObject);
    
}
jsonObject.loadModel(afterModelLoaded);


myWorld.render();




