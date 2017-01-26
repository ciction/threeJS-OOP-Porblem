/*
* License: Proprietary commercial software
* GC3D, Geocentre consulting 3D, 2013-2014(c)
* Developer: Oleg Orlov A
* http://geocenter-consulting.ru
*/

'use strict';

var GC3D = { Version: '1.0.2' };

GC3D.Enums = {
    renderer: {
        id: 0,
        type: THREE.WebGLRenderer
    },
    camera: {
        id: 1,
        type: THREE.PerspectiveCamera,
        fov: 45,
        aspect: window.innerWidth / window.innerHeight,
        near: 1,
        far: 10000
    },
    scene: {
        id: 2,
        type: THREE.Scene
    }
};


GC3D.Camera = function( settings ) {
    this.camera = new THREE.PerspectiveCamera(
        settings.fov,
        settings.aspect,
        settings.near,
        settings.far
    );
};
GC3D.Camera.prototype.get = function() {
    return this.camera;
};


GC3D.Light = function( color, intensity, distance ) {
    this.light = new THREE.PointLight(
        color,
        intensity,
        distance
    );
};
GC3D.Light.prototype.get = function() {
    return this.light;
};


GC3D.Cube = function( properties ) {
    this.geometry = new THREE.BoxGeometry( 
        properties.width,
        properties.height,
        properties.depth,
        properties.widthSegments,
        properties.heightSegments,
        properties.depthSegments
    );
    this.material = new THREE.MeshBasicMaterial({
        color: properties.color,
        wireframe: properties.wireframe
    });
    this.mesh = new THREE.Mesh(
        this.geometry,
        this.material
    );
    this.mesh.position.set(
        properties.position.x,
        properties.position.y,
        properties.position.z
    );
};
GC3D.Cube.prototype.get = function() {
    return this.mesh;
};
GC3D.Cube.prototype.setPosition = function( newPosition ) {
    this.mesh.position.set(
        newPosition.x,
        newPosition.y,
        newPosition.z
    );
};
GC3D.Cube.prototype.setPositionAxisValue = function( axis, value ) {
    switch( axis ) {
        case 'x':
            this.mesh.position.x = value;
            break;
        case 'y':
            this.mesh.position.y = value;
            break;
        case 'z':
            this.mesh.position.z = value;
            break;
        default:
            return -1;
    }
};
GC3D.Cube.prototype.movePosition = function( newPosition ) {
    if ( newPosition.x.direction === '+' ) this.mesh.position.x += newPosition.x;
    else if ( newPosition.x.direction === '-' ) this.mesh.position.x -= newPosition.x;

    if ( newPosition.y.direction === '+' ) this.mesh.position.y += newPosition.y;
    else if ( newPosition.y.direction === '-' ) this.mesh.position.y -= newPosition.y;

    if ( newPosition.z.direction === '+' ) this.mesh.position.z += newPosition.z;
    else if ( newPosition.z.direction === '-' ) this.mesh.position.z -= newPosition.z;
};
GC3D.Cube.prototype.movePositionAxisValue = function( axis, direction, value ) {
    switch( [ axis, direction].join( "" ) ) {
        case 'x+':
            this.mesh.position.x += value;
            break;
        case 'y+':
            this.mesh.position.y += value;
            break;
        case 'z+':
            this.mesh.position.z += value;
            break;
        case 'x-':
            this.mesh.position.x -= value;
            break;
        case 'y-':
            this.mesh.position.y -= value;
            break;
        case 'z-':
            this.mesh.position.z -= value;
            break;
        default:
            return -1;
    }
};


GC3D.Utils = function() {
    this.renderer = undefined;
    this.scene = undefined;
    this.camera = undefined;
};
GC3D.Utils.prototype.get = function() {
    var utils = {
        renderer: this.renderer,
        scene: this.scene,
        camera: this.camera
    };
    return utils;
};
GC3D.Utils.prototype.setObject = function( properties ) {
    switch( properties.type ) {
        case THREE.WebGLRenderer:
            this.renderer = new THREE.WebGLRenderer({
                alpha: true,
                wireframe: false
            });
            break;
        case THREE.Scene:
            this.scene = new THREE.Scene();
            break;
        case THREE.PerspectiveCamera:
            this.camera = new THREE.PerspectiveCamera(
                properties.fov,
                properties.aspect,
                properties.near,
                properties.far
            );
            break;
        default:
            return -1;
    }
};
GC3D.Utils.prototype.getObject = function( type ) {
    switch( type ) {
        case THREE.WebGLRenderer:
            return this.renderer;
        case THREE.Scene:
            return this.scene;
        case THREE.PerspectiveCamera:
            return this.camera;
        default:
            return -1;
    }
};
GC3D.Utils.prototype.renderScene = function() {
    // about bind()
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
    requestAnimationFrame( GC3D.Utils.prototype.renderScene.bind( this ) );
    this.renderer.render( this.scene, this.camera );

    // for test purpose only
    this.scene.children.filter(function( item ) {
        if ( item instanceof THREE.Mesh ) item.rotation.x += 0.02;
    });
    //
};
GC3D.Utils.prototype.setCameraPosition = function( camera, newPosition ) {
    if ( camera instanceof THREE.Camera ) camera.position.set( newPosition.x, newPosition.y, newPosition.z );
    else return -1;
};
GC3D.Utils.prototype.setCameraViewOnObject = function( camera, object ) {
    if ( camera instanceof THREE.Camera && object instanceof THREE.Mesh) this.camera.lookAt( object );
    else return -1;
};
GC3D.Utils.prototype.createCube = function( properties ) {  
    var cube = new GC3D.Cube( properties );
    return cube;
};
GC3D.Utils.prototype.addGeometricObject = function( properties ) {
    switch( properties.type ) {
        case GC3D.Cube:
            var cube = this.createCube( properties );
            this.scene.add( cube.mesh );
            return cube;
        default:
            return -1;
    }
};


GC3D.Application = function() {
    this.utils = new GC3D.Utils();
};
GC3D.Application.prototype.build = function() {
    this.utils.setObject( GC3D.Enums.renderer );
    this.utils.setObject( GC3D.Enums.scene );
    this.utils.setObject( GC3D.Enums.camera );

    // for test purpose only
    var cubeProperties = {
        type: GC3D.Cube,
        width: 1,
        height: 1,
        depth: 1,
        segments: {
            width: 1,
            height: 1,
            depth: 1
        },
        color: 0xff0000,
        wireframe: false,
        position: {
            x: 0,
            y: 0,
            z: 0
        }
    };
    var cube = this.utils.addGeometricObject( cubeProperties );
    this.utils.setCameraPosition( this.utils.camera, { x: 3, y: 3, z: 3 } );
    this.utils.setCameraViewOnObject( this.utils.camera, cube.mesh );
    //

    this.utils.renderScene();
};


window.onload = function() {
    var application = new GC3D.Application();
    application.build();
};