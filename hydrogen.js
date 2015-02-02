/*
HYDROGEN.JS

Comments:

    Functions flagged with an F e.g. addF(), are purely functional, in that they do
    not alter the object on which they are called and have no side effects

*/

//Create Hydrogen object
//var HYDROGEN = HYDROGEN || {};

HYDROGEN=function(){
    //pass
};

HYDROGEN.prototype = {

    constructor: HYDROGEN,

    VERSION:1.0,
    gl: null,
    canvas: null,
    canvas_name: null,
    shaderProgram: null,
    //var shaderPrograms={}
    shaderVertexPositionAttribute: null,
    shaderProjectionMatrixUniform: null,
    shaderModelViewMatrixUniform: null,

    //Shader section
    vSh_simple: {
        type: "vertex",
        str: "    attribute vec3 vertexPos;\n" +
            "    uniform mat4 modelViewMatrix;\n" +
            "    uniform mat4 projectionMatrix;\n" +
            "    void main(void) {\n" +
            "       // Return the transformed and projected vertex value\n" +
            "        gl_Position = projectionMatrix * modelViewMatrix * \n" +
            "            vec4(vertexPos, 1.0);\n" +
            "    }\n"
    },

    fSh_simple: {
        type: "fragment",
        str: "    void main(void) {\n" +
            "    // Return the pixel color: always output white\n" +
            "    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n" +
            "}\n"
    },

    //Default objects

    square_v_ts: [
        .5, .5, 0.0, -.5, .5, 0.0,
        .5, -.5, 0.0, -.5, -.5, 0.0
    ],

    quickStart: function(canvas_name) {
        this.initWebGL(canvas_name);
        this.initViewPort()
    },

    initWebGL: function(canvas_name) {
        var canvas = document.getElementById(canvas_name);
        var gl;
        try {
            gl = canvas.getContext("experimental-webgl");
        } catch (e) {
            var msg = "Error creating WebGL Context!" + e.toString();
            alert(msg);
            throw Error(msg);
        }
        this.gl = gl;
        this.canvas = canvas;
        this.canvas_name = canvas_name
        canvas.appendChild(document.createTextNode("initWebGL"))
    },

    initViewPort: function() {
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
    },

    createShader: function(str, type) {
        //console.log("createShader has been called");
        //console.log("type:"+type);
        //console.log("str:"+str);
        var shader;
        if (type == "fragment") {
            shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        } else if (type == "vertex") {
            //console.log("requested a vertex shader");
            shader = this.gl.createShader(this.gl.VERTEX_SHADER);
        } else {
            return null;
        }

        this.gl.shaderSource(shader, str);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            alert(this.gl.getShaderInfoLog(shader));
            return null;
        }

        return shader
    },

    initShader: function(fragmentSS, vertexSS) {
        var fragmentShader = this.createShader(fragmentSS, "fragment");
        var vertexShader = this.createShader(vertexSS, "vertex");

        // link them together into a new programd
        this.shaderProgram = this.gl.createProgram();
        //this.shaderProgram===null?console.log("shaderProgram is null"):console.log("vertexShader is null");
        this.gl.attachShader(this.shaderProgram, vertexShader);
        this.gl.attachShader(this.shaderProgram, fragmentShader);
        this.gl.linkProgram(this.shaderProgram);

        // get pointers to the shader params
        shaderVertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "vertexPos");
        this.gl.enableVertexAttribArray(shaderVertexPositionAttribute);

        shaderProjectionMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, "projectionMatrix");
        shaderModelViewMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, "modelViewMatrix");


        if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }
    }


};

//Define Vector2
HYDROGEN.Vector2 = function(a, b) {
    this.x = a || 0;
    this.y = b || 0
};
HYDROGEN.Vector2.prototype = {
    constructor: HYDROGEN.Vector2,

    set: function(a, b) {
        this.x = a;
        this.y = b;
        return this
    },

    setX: function(a) {
        this.x = a;
        return this
    },

    setY: function(b) {
        this.y = b;
        return this
    },

    getX: function() {
        return this.x
    },

    getY: function() {
        return this.y
    },

    copy: function(a) {
        this.x = a.x;
        this.y = a.y;
        return this
    },

    clone: function() {
        return new HYDROGEN.Vector2(this.x, this.y)
    },

    add: function(a) {
        this.x += a.x;
        this.y += a.y;
        return this;
    },

    addF: function(a) {
        return new Vector2(this.x + a.x, this.y + a.y)
    },

    addScalar: function(a) {
        this.x += a;
        this.y += a;
        return this;
    },

    addScalarF: function(a) {
        return new Vector2(this.x + a, this.y + a);
    },

    subtract: function(a) {
        this.x -= a.x;
        this.y -= a.y;
        return this;
    },

    subtractF: function(a) {
        return new Vector2(this.x - a.x, this.y - a.y)
    },

    multiplyScalar: function(a) {
        this.x *= a;
        this.y *= a;
        return this
    },

    multiplyScalarF: function(a) {
        return new Vector2(this.x * a, this.y * a)
    },

    addScaledVector: function(v, a) {
        this.x += a * v.x;
        this.y += a * v.y;
        return this
    },

    addScaledVectorF: function(v, a) {
        return new Vector2(this.x + a * v.x, this.y + a * v.y)
    },

    divideScalar: function(a) {
        a ? (this.x /= a, this.y /= a) : this.y = this.x = 0;
        return this
    },

    dot: function(v) {
        return this.x * v.x + this.y * v.y
    },

    lengthSquared: function() {
        return this.x * this.x + this.y * this.y
    },

    length: function() {
        return Math.sqrt(this.lengthSquared)
    },

    normalise: function() {
        return this.divideScalar(this.length())
    },

    normaliseF: function() {
        var l = this.length();
        return new Vector2(this.x / l, this.y / l)
    },

    setLength: function(l) {
        return this.normalise().multiplyScalar(l)
    },

    multiplyMatrix22: function(m) {
        var l = this.x;
        this.x = m.get(0) * l + m.get(1) * this.y;
        this.y = m.get(2) * l + m.get(3) * this.y;
        return this
    },

    multipulyMatrix22F: function(m) {
        return new HYDROGEN.Vector2(m.get(0) * this.x + m.get(1) * this.y,
            m.get(2) * this.x + m.get(3) * this.y)
    }
};

//Define Vector3
HYDROGEN.Vector3 = function(a, b, c) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0
};
HYDROGEN.Vector3.prototype = {

    constructor: HYDROGEN.Vector3,

    set: function(a, b, c) {
        this.x = a;
        this.y = b;
        this.z = c;
        return this
    },

    setX: function(a) {
        this.x = a;
        return this
    },

    setY: function(b) {
        this.y = b;
        return this
    },

    setZ: function(c) {
        this.z = c;
        return this
    },

    setX: function() {
        return this.x
    },

    setY: function() {
        return this.y
    },

    setZ: function() {
        return this.z
    },


    copy: function(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        return this
    },

    clone: function() {
        return new HYDROGEN.Vector3(this.x, this.y, this.z)
    },

    add: function(a) {
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        return this
    },

    addF: function(a) {
        return new Vector3(
            this.x + a.x,
            this.y + a.y,
            this.z + a.z
        )
    },

    addScalar: function(a) {
        this.x += a;
        this.y += a;
        this.z += a;
        return this
    },

    subtract: function(a) {
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        return this
    },

    subtractF: function(a) {
        return new Vector3(
            this.x - a.x,
            this.y - a.y,
            this.z - a.z
        )
    },

    multiplyScalar: function(a) {
        this.x *= a;
        this.y *= a;
        this.z *= a;
        return this
    },

    multiplyScalarF: function(a) {
        return new Vector3(
            this.x * a,
            this.y * a,
            this.z * a
        )
    },

    addScaledVector: function(v, a) {
        this.x += a * v.x;
        this.y += a * v.y;
        this.z += a * v.z;
        return this
    },

    addScaledVectorF: function(v, a) {
        return new Vector3(
            this.x + v.x * a,
            this.y + v.y * a,
            this.z + v.z * a
        )
    },

    divideScalar: function(a) {
        a ? (this.x /= a, this.y /= a, this.z /= a) : this.z = this.y = this.x = 0;
        return this
    },

    divideScalarF: function(a) {
        return a ?
            new Vector3(this.x /= a, this.y /= a, this.z /= a) : new Vector3(0, 0, 0)
    },

    dot: function(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z
    },

    lengthSquared: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z
    },

    length: function() {
        return Math.sqrt(this.lengthSquared)
    },

    normalise: function() {
        return this.divideScalar(this.length)
    },

    normaliseF: function() {
        var l = this.length();
        return new Vector3(this.x / l,
            this.y / l,
            this.z / l)

    },

    setLength: function(l) {
        return this.normalise().multiplyScalar(l)
    },

    cross: function(v) {
        a = v.x;
        b = v.y;
        c = v.z;
        this.x = b * this.z - c * this.y;
        this.y = c * this.x - a * this.z;
        this.z = a * this.y - b * this.x;
        return this
    },

    crossF: function(v) {
        a = v.x;
        b = v.y;
        c = v.z;
        return new Vector3(
            b * this.z - c * this.y,
            c * this.x - a * this.z,
            a * this.y - b * this.x)
    },

    multiplyMatrix33: function(m) {
        // [0,1,2] [x]
        // [3,4,5] [y]
        // [6,7,8] [z]
        var $x = this.x;
        var $y = this.y;
        var $z = this.z;

        this.x = m[0] * $x + m[1] * $y + m[2] * $z;
        this.y = m[3] * $x + m[4] * $y + m[5] * $z;
        this.z = m[6] * $x + m[7] * $y + m[8] * $z;
        return this
    },

    multiplyMatrix33F: function(m) {
        // [0,1,2] [x]
        // [3,4,5] [y]
        // [6,7,8] [z]
        var $x = this.x;
        var $y = this.y;
        var $z = this.z;
        return new Vector3(
            this.x = m[0] * $x + m[1] * $y + m[2] * $z,
            this.y = m[3] * $x + m[4] * $y + m[5] * $z,
            this.z = m[6] * $x + m[7] * $y + m[8] * $z)
    }
};

//Define Vector4
HYDROGEN.Vector4 = function(a, b, c, d) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0;
    this.w = d || 0
};
HYDROGEN.Vector4.prototype = {

    constructor: HYDROGEN.Vector4,

    set: function(a, b, c) {
        this.x = a;
        this.y = b;
        this.z = c;
        this.w = d;
        return this
    },

    setX: function(a) {
        this.x = a;
        return this
    },

    setY: function(b) {
        this.y = b;
        return this
    },

    setZ: function(c) {
        this.z = c;
        return this
    },

    setW: function(d) {
        this.w = d;
        return this
    },

    setX: function() {
        return this.x
    },

    setY: function() {
        return this.y
    },

    setZ: function() {
        return this.z
    },

    setW: function() {
        return this.w
    },

    copy: function(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = a.w != void 0 ? a.w : 1;
        return this
    },

    clone: function() {
        return new Vector4(this.x, this.y, this.z, this.w)
    },

    add: function(a) {
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        this.w += a.w;
        return this
    },

    addF: function(a) {
        return new Vector4(
            this.x += a.x,
            this.y += a.y,
            this.z += a.y,
            this.w += a.w)
    },

    addScalar: function(a) {
        this.x += a;
        this.y += a;
        this.z += a;
        this.w += a;
        return this
    },

    subtract: function(a) {
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        this.w -= a.w;
        return this
    },

    subtractF: function(a) {
        return new Vector4(
            this.x -= a.x,
            this.y -= a.y,
            this.z -= a.z,
            this.w -= a.w)
    },

    multiplyScalar: function(a) {
        this.x *= a;
        this.y *= a;
        this.z *= a;
        this.w *= a;
        return this
    },

    multiplyScalarF: function(a) {
        // body...
    },

    addScaledVector: function(v, a) {
        this.x += a * v.x;
        this.y += a * v.y;
        this.z += a * v.z;
        this.w += a * v.w;
        return this
    },

    addScaledVectorF: function(v, a) {
        // body...
    },

    divideScalar: function(a) {
        a ? (this.x /= a, this.y /= a, this.z /= a, this.w /= a) : this.w = this.z = this.y = this.x = 0;
        return this
    },

    divideScalarF: function(a) {
        // body...
    },

    dot: function(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w
    },

    lengthSquared: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    },

    length: function() {
        return Math.sqrt(this.lengthSquared)
    },

    normalise: function() {
        return this.divideScalar(this.length)
    },

    normaliseF: function() {
        var l = this.length();
        return new Vector4(this.x / l,
            this.y / l,
            this.z / l,
            this.w / l)
    },

    setLength: function(l) {
        return this.normalise().multiplyScalar(l)
    },

    multiplyMatrix44: function(m) {
        //[ 0, 1, 2, 3][x]
        //[ 4, 5, 6, 7][y]
        //[ 8, 9,10,11][z]
        //[12,13,14,15][w]
        var $x = this.x;
        var $y = this.y;
        var $z = this.z;
        var $w = this.w;

        this.x = m[0] * $x + m[1] * $y + m[2] * $z + m[3] * $w;
        this.y = m[4] * $x + m[5] * $y + m[6] * $z + m[7] * $w;
        this.z = m[8] * $x + m[9] * $y + m[10] * $z + m[11] * $w;
        this.w = m[12] * $x + m[13] * $y + m[14] * $z + m[15] * $w;
        return this;
    },

    multiplyMatrix44F: function(m) {
        //[ 0, 1, 2, 3][x]
        //[ 4, 5, 6, 7][y]
        //[ 8, 9,10,11][z]
        //[12,13,14,15][w]

        var $x = this.x;
        var $y = this.y;
        var $z = this.z;
        var $w = this.w;

        return new Vector4(
            this.x = m[0] * $x + m[1] * $y + m[2] * $z + m[3] * $w,
            this.y = m[4] * $x + m[5] * $y + m[6] * $z + m[7] * $w,
            this.z = m[8] * $x + m[9] * $y + m[10] * $z + m[11] * $w,
            this.w = m[12] * $x + m[13] * $y + m[14] * $z + m[15] * $w)
    }
};

//Define Matrix22
//For reference, array indices relate to the following matrix elements
//[0,1]
//[2,3]
HYDROGEN.Matrix22 = function(a, b, c, d) {
    this.m = []
    this.m[0] = a !== void 0 ? a : 1;
    this.m[1] = b !== void 0 ? b : 0;
    this.m[2] = c !== void 0 ? c : 0;
    this.m[3] = d !== void 0 ? d : 1;
};
HYDROGEN.Matrix22.prototype = {

    constructor: HYDROGEN.Matrix22,

    transpose: function() {
        var a, c = this.m;
        a = c[1];
        c[2] = c[1];
        c[1] = a;
        return this
    },

    setIdentity: function() {
        this.m[0] = 1;
        this.m[1] = 0;
        this.m[2] = 0;
        this.m[3] = 1;
        return this
    },

    multiplyScalar: function(a) {
        this.m[0] *= a;
        this.m[1] *= a;
        this.m[2] *= a;
        this.m[3] *= a;
        return this
    },

    multiplyScalarF: function(a) {
        return new Matrix22(
            this.m[0] *= a,
            this.m[1] *= a,
            this.m[2] *= a,
            this.m[3] *= a
        )
    },

    multiplyMatrix22: function(m) {
        //[0,1][a,b]
        //[2,3][c,d]
        var a = this.m[0];
        var b = this.m[1];
        var c = this.m[2];
        var d = this.m[3];

        this.m[0] = m.m[0] * a + m.m[1] * c;
        this.m[1] = m.m[0] * b + m.m[1] * d;
        this.m[2] = m.m[2] * a + m.m[3] * c;
        this.m[3] = m.m[2] * b + m.m[3] * d;
        return this
    },

    multiplyMatrix22F: function(m) {
        //[0,1][a,b]
        //[2,3][c,d]
        var a = this.m[0];
        var b = this.m[1];
        var c = this.m[2];
        var d = this.m[3];

        return new Matrix22(
            this.m[0] = m.m[0] * a + m.m[1] * c,
            this.m[1] = m.m[0] * b + m.m[1] * d,
            this.m[2] = m.m[2] * a + m.m[3] * c,
            this.m[3] = m.m[2] * b + m.m[3] * d)
    },

    get: function(i) {
        return this.m[i]
    },

    setRotationMatrix: function(alpha) {
        var cos = Math.cos(alpha / (2 * Math.PI));
        var sin = Math.sin(alpha / (2 * Math.PI));

        this.m[0] = cos;
        this.m[1] = -sin;
        this.m[2] = sin;
        this.m[3] = cos;
    }
};
HYDROGEN.Matrix22.getRotation = function(alpha) {
    var matrix = new Matrix22();

    var cos = Math.cos(alpha / (2 * Math.PI));
    var sin = Math.sin(alpha / (2 * Math.PI));

    matrix.m[0] = cos;
    matrix.m[1] = -sin;
    matrix.m[2] = sin;
    matrix.m[3] = cos;
};

//Define Matrix33
//For reference, array indices relate to following matrix elements
//[0,1,2]
//[3,4,5]
//[6,7,8]
HYDROGEN.Matrix33 = function(a, b, c, d, e, f, g, h, i) {
    this.m = [];
    this.m[0] = a !== void 0 ? a : 1;
    this.m[1] = b !== void 0 ? b : 0;
    this.m[2] = c !== void 0 ? c : 0;
    this.m[3] = d !== void 0 ? d : 0;
    this.m[4] = e !== void 0 ? e : 1;
    this.m[5] = f !== void 0 ? f : 0;
    this.m[6] = g !== void 0 ? g : 0;
    this.m[7] = h !== void 0 ? h : 0;
    this.m[8] = i !== void 0 ? i : 1;
};
HYDROGEN.Matrix33.prototype = {
    constructor: HYDROGEN.Matrix33,

    transpose: function() {
        var a, c = this.m;
        a = c[1];
        c[1] = c[3];
        c[3] = a;
        a = c[6];
        c[2] = c[6];
        c[6] = a;
        a = c[5];
        c[5] = c[7];
        c[7] = a;
        return this
    },

    setIdentity: function() {
        this.m[0] = 1;
        this.m[1] = 0;
        this.m[2] = 0;
        this.m[3] = 0;
        this.m[4] = 1;
        this.m[5] = 0;
        this.m[6] = 0;
        this.m[7] = 0;
        this.m[8] = 1;
        return this
    },

    multiplyScalar: function(a) {
        for (var i = 0; i < this.m.length; i++) {
            this.m[i] *= a;
        };
        return this
    },

    multiplyScalarF: function(a) {
        var matrix = new Matrix33();
        for (var i = 0; i < this.m.length; i++) {
            matrix.m[i] = this.m[i] * a;
        };
    },

    get: function(i) {
        return i < 9 ? this.m[i] : 0
    },

    multiplyMatrix33: function(m) {
        //[ 0, 1, 2][a,b,c]
        //[ 3, 4, 5][d,e,f]
        //[ 6, 7, 8][g,h,i]
        var a, b, c;
        a = m.m[0] * this.m[0] + m.m[1] * this.m[3] + m.m[2] * this.m[6];
        b = m.m[0] * this.m[1] + m.m[1] * this.m[4] + m.m[2] * this.m[7];
        c = m.m[0] * this.m[2] + m.m[1] * this.m[5] + m.m[2] * this.m[8];
        this.m[0] = a;
        this.m[1] = b;
        this.m[2] = c;

        a = m.m[3] * this.m[0] + m.m[4] * this.m[3] + m.m[5] * this.m[6];
        b = m.m[3] * this.m[1] + m.m[4] * this.m[4] + m.m[5] * this.m[7];
        c = m.m[3] * this.m[2] + m.m[4] * this.m[5] + m.m[5] * this.m[8];
        this.m[3] = a;
        this.m[4] = b;
        this.m[5] = c;

        a = m.m[6] * this.m[0] + m.m[7] * this.m[3] + m.m[8] * this.m[6];
        b = m.m[6] * this.m[1] + m.m[7] * this.m[4] + m.m[8] * this.m[7];
        c = m.m[6] * this.m[2] + m.m[7] * this.m[5] + m.m[8] * this.m[8];
        this.m[6] = a;
        this.m[7] = b;
        this.m[8] = c;
        return this
    },

    multiplyMatrix33F: function(m) {
        //[ 0, 1, 2][a,b,c]
        //[ 3, 4, 5][d,e,f]
        //[ 6, 7, 8][g,h,i]
        var a, b, c;
        var matrix = new Matrix33();
        a = m.m[0] * this.m[0] + m.m[1] * this.m[3] + m.m[2] * this.m[6];
        b = m.m[0] * this.m[1] + m.m[1] * this.m[4] + m.m[2] * this.m[7];
        c = m.m[0] * this.m[2] + m.m[1] * this.m[5] + m.m[2] * this.m[8];
        matrix.m[0] = a;
        matrix.m[1] = b;
        matrix.m[2] = c;

        a = m.m[3] * this.m[0] + m.m[4] * this.m[3] + m.m[5] * this.m[6];
        b = m.m[3] * this.m[1] + m.m[4] * this.m[4] + m.m[5] * this.m[7];
        c = m.m[3] * this.m[2] + m.m[4] * this.m[5] + m.m[5] * this.m[8];
        matrix.m[3] = a;
        matrix.m[4] = b;
        matrix.m[5] = c;

        a = m.m[6] * this.m[0] + m.m[7] * this.m[3] + m.m[8] * this.m[6];
        b = m.m[6] * this.m[1] + m.m[7] * this.m[4] + m.m[8] * this.m[7];
        c = m.m[6] * this.m[2] + m.m[7] * this.m[5] + m.m[8] * this.m[8];
        matrix.m[6] = a;
        matrix.m[7] = b;
        matrix.m[8] = c;

        return matrix

    },

    multiplyVector3: function(v) {
        //[ 0, 1, 2][x]
        //[ 3, 4, 5][y]
        //[ 6, 7, 8][z]

        a = v.x;
        b = v.y;
        c = v.z;
        v.x = this.m[0] * a + this.m[1] * b + this.get[2] * c;
        v.y = this.m[3] * a + this.m[4] * b + this.get[5] * c;
        v.z = this.m[6] * a + this.m[7] * b + this.get[8] * c;
        return this
    },

    multiplyVector3F: function(v) {
        //[ 0, 1, 2][x]
        //[ 3, 4, 5][y]
        //[ 6, 7, 8][z]

        a = v.x;
        b = v.y;
        c = v.z;
        return new Vector3(
            this.m[0] * a + this.m[1] * b + this.get[2] * c,
            this.m[3] * a + this.m[4] * b + this.get[5] * c,
            this.m[6] * a + this.m[7] * b + this.get[8] * c)
    },
};


//Define Matrix44
//For reference, array indices relate to following matrix elements
//[ 0, 1, 2, 3]
//[ 4, 5, 6, 7]
//[ 8, 9,10,11]
//[12,13,14,15]
HYDROGEN.Matrix44 = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    this.m = [];
    this.m[0] = a !== void 0 ? a : 0;
    this.m[1] = b !== void 0 ? b : 0;
    this.m[2] = c !== void 0 ? c : 0;
    this.m[3] = d !== void 0 ? d : 0;
    this.m[4] = e !== void 0 ? e : 0;
    this.m[5] = f !== void 0 ? f : 0;
    this.m[6] = g !== void 0 ? g : 0;
    this.m[7] = h !== void 0 ? h : 0;
    this.m[8] = i !== void 0 ? i : 0;
    this.m[9] = j !== void 0 ? j : 0;
    this.m[10] = k !== void 0 ? k : 0;
    this.m[11] = l !== void 0 ? l : 0;
    this.m[12] = m !== void 0 ? m : 0;
    this.m[13] = n !== void 0 ? n : 0;
    this.m[14] = o !== void 0 ? o : 0;
    this.m[15] = p !== void 0 ? p : 0;
};
HYDROGEN.Matrix44.prototype = {
    constructor: HYDROGEN.Matrix44,

    transpose: function() {
        var a, c = this.m;
        a = c[1];
        c[1] = c[4];
        c[4] = a;
        a = c[2];
        c[2] = c[8];
        c[8] = a;
        a = c[3];
        c[3] = c[12];
        c[12] = a;
        a = c[7];
        c[7] = c[13];
        c[13] = a;
        a = c[11];
        c[11] = c[14];
        c[14] = a;
        return this
    },

    get: function(i) {
        return this.m[i]
    },

    setIdentity: function() {
        this.m[0] = 1;
        this.m[1] = 0;
        this.m[2] = 0;
        this.m[3] = 0;
        this.m[4] = 0;
        this.m[5] = 1;
        this.m[6] = 0;
        this.m[7] = 0;
        this.m[8] = 0;
        this.m[9] = 0;
        this.m[10] = 1;
        this.m[11] = 0;
        this.m[12] = 0;
        this.m[13] = 0;
        this.m[14] = 0;
        this.m[15] = 1;
        return this;
    },

    multiplyScalar: function(a) {
        for (var i = 0; i < this.m.length; i++) {
            this.m[i] * a;
        };
        return this
    },

    multiplyScalarF: function(a) {
        var matrix = new Matrix44();
        for (var i = 0; i < this.m.length; i++) {
            matrix.m[i]
        };
        return matrix;
    },

    multiplyMatrix44: function(m) {
        //[ 0, 1, 2, 3][ 0, 1, 2, 3]
        //[ 4, 5, 6, 7][ 4, 5, 6, 7]
        //[ 8, 9,10,11][ 8, 9,10,11]
        //[12,13,14,15][12,13,14,15]

        var a, b, c, d;

        a = m.m[0] * this.m[0] + m.m[1] * this.m[4] + m.m[2] * this.m[8] + m.m[3] * this.m[12];
        b = m.m[0] * this.m[1] + m.m[1] * this.m[5] + m.m[2] * this.m[9] + m.m[3] * this.m[13];
        c = m.m[0] * this.m[2] + m.m[1] * this.m[6] + m.m[2] * this.m[10] + m.m[3] * this.m[14];
        d = m.m[0] * this.m[3] + m.m[1] * this.m[7] + m.m[2] * this.m[11] + m.m[3] * this.m[15];
        this.m[0] = a;
        this.m[1] = b;
        this.m[2] = c;
        this.m[3] = d;

        a = m.m[4] * this.m[0] + m.m[5] * this.m[4] + m.m[6] * this.m[8] + m.m[7] * this.m[12];
        b = m.m[4] * this.m[1] + m.m[5] * this.m[5] + m.m[6] * this.m[9] + m.m[7] * this.m[13];
        c = m.m[4] * this.m[2] + m.m[5] * this.m[6] + m.m[6] * this.m[10] + m.m[7] * this.m[14];
        d = m.m[4] * this.m[3] + m.m[5] * this.m[7] + m.m[6] * this.m[11] + m.m[7] * this.m[15];
        this.m[4] = a;
        this.m[5] = b;
        this.m[6] = c;
        this.m[7] = d;

        a = m.m[8] * this.m[0] + m.m[9] * this.m[4] + m.m[10] * this.m[8] + m.m[11] * this.m[12];
        b = m.m[8] * this.m[1] + m.m[9] * this.m[5] + m.m[10] * this.m[9] + m.m[11] * this.m[13];
        c = m.m[8] * this.m[2] + m.m[9] * this.m[6] + m.m[10] * this.m[10] + m.m[11] * this.m[14];
        d = m.m[8] * this.m[3] + m.m[9] * this.m[7] + m.m[10] * this.m[11] + m.m[11] * this.m[15];
        this.m[8] = a;
        this.m[9] = b;
        this.m[10] = c;
        this.m[11] = d;

        a = m.m[12] * this.m[0] + m.m[13] * this.m[4] + m.m[14] * this.m[8] + m.m[15] * this.m[12];
        b = m.m[12] * this.m[1] + m.m[13] * this.m[5] + m.m[14] * this.m[9] + m.m[15] * this.m[13];
        c = m.m[12] * this.m[2] + m.m[13] * this.m[6] + m.m[14] * this.m[10] + m.m[15] * this.m[14];
        d = m.m[12] * this.m[3] + m.m[13] * this.m[7] + m.m[14] * this.m[11] + m.m[15] * this.m[15];
        this.m[12] = a;
        this.m[13] = b;
        this.m[14] = c;
        this.m[15] = d;

        return this;

    },

    multiplyMatrix44F: function(m) {
        //[ 0, 1, 2, 3][ 0, 1, 2, 3]
        //[ 4, 5, 6, 7][ 4, 5, 6, 7]
        //[ 8, 9,10,11][ 8, 9,10,11]
        //[12,13,14,15][12,13,14,15]

        var matrix = new Matrix44();

        matrix.m[0] = m.m[0] * this.m[0] + m.m[1] * this.m[4] + m.m[2] * this.m[8] + m.m[3] * this.m[12];
        matrix.m[1] = m.m[0] * this.m[1] + m.m[1] * this.m[5] + m.m[2] * this.m[9] + m.m[3] * this.m[13];
        matrix.m[2] = m.m[0] * this.m[2] + m.m[1] * this.m[6] + m.m[2] * this.m[10] + m.m[3] * this.m[14];
        matrix.m[3] = m.m[0] * this.m[3] + m.m[1] * this.m[7] + m.m[2] * this.m[11] + m.m[3] * this.m[15];

        matrix.m[4] = m.m[4] * this.m[0] + m.m[5] * this.m[4] + m.m[6] * this.m[8] + m.m[7] * this.m[12];
        matrix.m[5] = m.m[4] * this.m[1] + m.m[5] * this.m[5] + m.m[6] * this.m[9] + m.m[7] * this.m[13];
        matrix.m[6] = m.m[4] * this.m[2] + m.m[5] * this.m[6] + m.m[6] * this.m[10] + m.m[7] * this.m[14];
        matrix.m[7] = m.m[4] * this.m[3] + m.m[5] * this.m[7] + m.m[6] * this.m[11] + m.m[7] * this.m[15];

        matrix.m[8] = m.m[8] * this.m[0] + m.m[9] * this.m[4] + m.m[10] * this.m[8] + m.m[11] * this.m[12];
        matrix.m[9] = m.m[8] * this.m[1] + m.m[9] * this.m[5] + m.m[10] * this.m[9] + m.m[11] * this.m[13];
        matrix.m[10] = m.m[8] * this.m[2] + m.m[9] * this.m[6] + m.m[10] * this.m[10] + m.m[11] * this.m[14];
        matrix.m[11] = m.m[8] * this.m[3] + m.m[9] * this.m[7] + m.m[10] * this.m[11] + m.m[11] * this.m[15];

        matrix.m[12] = m.m[12] * this.m[0] + m.m[13] * this.m[4] + m.m[14] * this.m[8] + m.m[15] * this.m[12];
        matrix.m[13] = m.m[12] * this.m[1] + m.m[13] * this.m[5] + m.m[14] * this.m[9] + m.m[15] * this.m[13];
        matrix.m[14] = m.m[12] * this.m[2] + m.m[13] * this.m[6] + m.m[14] * this.m[10] + m.m[15] * this.m[14];
        matrix.m[15] = m.m[12] * this.m[3] + m.m[13] * this.m[7] + m.m[14] * this.m[11] + m.m[15] * this.m[15];

        return matrix;

    }
};

//Define Quarternion
HYDROGEN.Quarternion = function(a, b, c, d) {
    this.r = a || 0;
    this.x = b || 0;
    this.y = c || 0;
    this.z = d || 0;
};
HYDROGEN.Quarternion.SetFromAngleVectorF = function(a, v) {
    var sinhalf = Math.sin(a / 2.0);
    var coshalf = Math.sin(a / 2.0);
    var q = new Quarternion();
    q.r = coshalf;
    q.x = v.x * sinhalf;
    q.y = v.y * sinhalf;
    q.z = v.z * sinhalf;
    q.normalise();
    return q;
};
HYDROGEN.Quarternion.prototype = {
    constructor: HYDROGEN.Quarternion,

    SetFromList: function(list) {
        this.r = list[0];
        this.x = list[1];
        this.y = list[2];
        this.z = list[3];
    },

    SetFromAngleVector: function(a, v) {
        var sinhalf = Math.sin(a / 2.0);
        var coshalf = Math.sin(a / 2.0);
        this.r = coshalf;
        this.x = v.x * sinhalf;
        this.y = v.y * sinhalf;
        this.z = v.z * sinhalf;
        this.normalise();
    },

    normalise: function() {
        var l = Math.sqrt(this.r * this.r + this.x * this.x + this.y * this.y + this.z * this.z);
        this.r *= 1 / l;
        this.x *= 1 / l;
        this.y *= 1 / l;
        this.z *= 1 / l;
    },

    normaliseF: function() {
        var l = this.getMagnitude();
        return new Quarternion(this.r / l, this.x / l, this.y / l, this.z / l);
    },

    addF: function(q) {
        return new Quarternion(this.r + q.r, this.x + q.x, this.y + q.y, this.z + q.z);
    },

    add: function(q) {
        this.r += q.r;
        this.x += q.x;
        this.y += q.y;
        this.z += q.z;
    },

    subtract: function(q) {
        return new Quarternion(this.r - q.r, this.x - q.x, this.y - q.y, this.z - q.z);
    },

    subtractF: function(q) {
        this.r -= q.r;
        this.x -= q.x;
        this.y -= q.y;
        this.z -= q.z;
    },

    multiplyScalar: function(a) {
        this.r *= a;
        this.x *= a;
        this.y *= a;
        this.z *= a;
    },

    multiplyScalarF: function(a) {
        return new Quarternion(this.r * a, this.x * a, this.y * a, this.z * a);
    },

    divideScalar: function(a) {
        this.multiplyScalar(1 / a);
    },

    divideScalarF: function(a) {
        return this.multiplyScalarF(1 / a);
    },

    getMagnitudeSquared: function() {
        return this.r * this.r + this.x * this.x + this.y * this.y + this.z * this.z;
    },

    getMagnitude: function() {
        return Math.sqrt(this.getMagnitudeSquared());
    },

    multiply: function(q) {

        //Check commutativity of quarternion mulitpliciation
        this.r = this.r * q.r - this.x * q.x - this.y * q.y - this.z * q.z;
        this.x = this.r * q.x + this.x * q.r + this.y * q.z - this.z * q.y;
        this.y = this.r * q.y - this.x * q.z + this.y * q.r + this.z * q.x;
        this.z = this.r * q.z + this.x * q.y - this.y * q.x + this.z * q.r;
    },

    multiplyF: function(q) {
        return new Quarternion(this.r * q.r - this.x * q.x - this.y * q.y - this.z * q.z,
            this.r * q.x + this.x * q.r + this.y * q.z - this.z * q.y,
            this.r * q.y - this.x * q.z + this.y * q.r + this.z * q.x,
            this.r * q.z + this.x * q.y - this.y * q.x + this.z * q.r);
    },

    toMatrix33: function() {
        var a = this.r;
        var b = this.x;
        var c = this.y;
        var d = this.z;
        var M = new Matrix33(1.0 - 2.0 * (c * c + d * d),
            2.0 * (b * c - a * d),
            2.0 * (a * c + b * d),
            2.0 * (b * c + a * d),
            1.0 - 2.0 * (b * b + d * d),
            2.0 * (c * d - a * b),
            2.0 * (b * d - a * c),
            2.0 * (a * b + c * d),
            1.0 - 2.0 * (b * b + c * c));
    }

};

//Define BoundingSphere3D
HYDROGEN.BoundingSphere3D = function(v, r) {
    this.v = v;
    this.r = r;
};
HYDROGEN.BoundingSphere3D.prototype = {

    constructor: HYDROGEN.BoundingSphere3D,

    setV: function(v) {
        this.v = v;
    },

    setR: function(r) {
        this.r = r;
    },

    setFromVerticesList: function(vlist) {

        //Calculate smallest bounding sphere
        //Several algorithms

        for (var i = 0; i < vlist.length; i++) {
            //DO SOMETHING
        };
    }
};

//Define Axis-Aligned Bounding-Box in 3D
HYDROGEN.AABB3D = function(v, hx, hy, hz) {
    this.v = v;
    this.hx = hx;
    this.hy = hy;
    this.hz = hz;
};
HYDROGEN.AABB3D.prototype = {

    constructor: HYDROGEN.AABB3D,

    setV: function(v) {
        this.v = v;
    },

    setSize: function(hx, hy, hz) {
        this.hx = hx;
        this.hy = hy;
        this.hz = hz;
    },

    setHX: function(hx) {
        this.hx = hx;
    },

    setHY: function(hy) {
        this.hy = hy;
    },

    setHZ: function(hz) {
        this.hz = hz;
    },

    getV: function() {
        return this.v;
    },

    getHX: function() {
        return this.hx;
    },

    getHY: function() {
        return this.hy;
    },

    getHZ: function() {
        return this.hz;
    },


    setFromVerticesList: function(vlist) {

        xmax, ymax, zmax = void 0;
        xmin, ymin, zmin = void 0;
        var x, y, z;

        for (var i = 0; i < vlist.length; i++) {
            x = vlist[i].getX();
            y = vlist[i].getY();
            z = vlist[i].getZ();

            xmax == void 0 ? xmax = x : x > xmax ? xmax = x : xmax = xmax;
            ymax == void 0 ? ymax = y : y > ymax ? ymax = y : ymax = ymax;
            zmax == void 0 ? zmax = z : z > zmax ? zmax = z : zmax = zmax;

            xmin == void 0 ? xmin = x : x < xmin ? xmin = x : xmin = xmin;
            ymin == void 0 ? ymin = y : y < ymin ? ymin = y : ymin = ymin;
            zmin == void 0 ? zmin = z : z < zmin ? zmin = z : zmin = zmin;
        };

        this.hx = (xmax - xmin) / 2;
        this.hy = (ymax - ymin) / 2;
        this.hz = (zmax - zmin) / 2;

        this.v = new Vector3(
            xmin + this.hx,
            ymin + this.hy,
            zmin + this.hz
        );

    }
};

//Define Object-Aligned Bounding-Box in 3D
HYDROGEN.OABB3D = function(p, q, hx, hy, hz) {
    this.p = p;
    this.q = q;
    this.hx = hx;
    this.hy = hy;
    this.hz = hz;
};
HYDROGEN.OABB3D.prototype = {
    constructor: HYDROGEN.OABB3D
};

//Define Bounding Cylinder in 3D
HYDROGEN.BoundingCylinder3D = function() {
    // body...
};
HYDROGEN.BoundingCylinder3D.prototype = {
    constructor: HYDROGEN.BoundingCylinder3D
};

//Define Bounding Plane in 3D
HYDROGEN.BoundingPlane3D = function(p, n) {
    p !== void 0 ? this.p = p : this.p = new Vector3();
    n !== void 0 ? this.n = n : this.n = new Vector3(0, 0, 1)
};
HYDROGEN.BoundingPlane3D.prototype = {
    constructor: HYDROGEN.BoundingPlane3D,
    distance: function(v) {
        return this.n.dot(v.subtractF(this.p));
    }
};

//Define Bounding Sphere in 2D
HYDROGEN.BoundingSphere2D = function(v, r) {
    this.v = v;
    this.r = r;
};
HYDROGEN.BoundingSphere2D.prototype = {

    constructor: HYDROGEN.BoundingSphere2D,

    setV: function(v) {
        this.v = v;
    },

    setR: function(r) {
        this.r = r;
    },

    setFromVerticesList: function(vlist) {

        //Calculate smallest bounding sphere
        //Several algorithms

        for (var i = 0; i < vlist.length; i++) {
            //DO SOMETHING
        };
    }
};

//Define Axis-Aligned Bounding-Box in 2D
HYDROGEN.AABB2D = function(v, hx, hy) {
    this.v = v;
    this.hx = hx;
    this.hy = hy;
};
HYDROGEN.AABB2D.prototype = {

    constructor: HYDROGEN.AABB2D,

    setV: function(v) {
        this.v = v;
    },

    setSize: function(hx, hy) {
        this.hx = hx;
        this.hy = hy;
    },

    setHX: function(hx) {
        this.hx = hx;
    },

    setHY: function(hy) {
        this.hy = hy;
    },

    getV: function() {
        return this.v;
    },

    getHX: function() {
        return this.hx;
    },

    getHY: function() {
        return this.hy;
    },

    setFromVerticesList: function(vlist) {

        xmax, ymax = void 0;
        xmin, ymin = void 0;
        var x, y;

        for (var i = 0; i < vlist.length; i++) {
            x = vlist[i].getX();
            y = vlist[i].getY();

            xmax == void 0 ? xmax = x : x > xmax ? xmax = x : xmax = xmax;
            ymax == void 0 ? ymax = y : y > ymax ? ymax = y : ymax = ymax;

            xmin == void 0 ? xmin = x : x < xmin ? xmin = x : xmin = xmin;
            ymin == void 0 ? ymin = y : y < ymin ? ymin = y : ymin = ymin;
        };

        this.hx = (xmax - xmin) / 2;
        this.hy = (ymax - ymin) / 2;

        this.v = new Vector2(
            xmin + this.hx,
            ymin + this.hy
        );

    }
};

//Define Object-Aligned Bounding Box in 2D
HYDROGEN.OABB2D = function(p, q, hx, hy) {
    this.p = p;
    this.q = q;
    this.hx = hx;
    this.hy = hy;
};
HYDROGEN.OABB2D.prototype = {
    constructor: HYDROGEN.OABB2D
};

//Define Bounding Plane in 2D
HYDROGEN.BoundingPlane2D = function(p, n) {
    p !== void 0 ? this.p = p : this.p = new Vector2();
    n !== void 0 ? this.n = n : this.n = new Vector2(0, 1)
};
HYDROGEN.BoundingPlane2D.prototype = {
    constructor: HYDROGEN.BoundingPlane2D,
    distance: function(v) {
        return this.n.dot(v.subtractF(this.p));
    }
};

//Define Ray object in 2D
HYDROGEN.Ray2D = function(p, v) {
    this.p = p;
    this.v = v;
};
HYDROGEN.Ray2D.prototype = {
    constructor: HYDROGEN.Ray2D,

    setP: function(p) {
        this.p = p;
    },
    setV: function(v) {
        this.v = v;
    }
};

//Define Ray object in 3D
HYDROGEN.Ray3D = function(p, v) {
    this.p = p;
    this.v = v;
};
HYDROGEN.Ray3D.prototype = {
    constructor: HYDROGEN.Ray3D,

    setP: function(p) {
        this.p = p;
    },
    setV: function(v) {
        this.v = v;
    }
};

//Define Collision Detector for 2D
HYDROGEN.CollisionDetector2D = function() {
    // body...
};
HYDROGEN.CollisionDetector2D.prototype = {
    constructor: HYDROGEN.CollisionDetector2D,

    checkForCollision: function(a, b) {
        // body...
        if ((a instanceof BoundingSphere2D) && (b instanceof BoundingSphere2D)) {
            return BoundingSphere2D_BoundingSphere2D(a, b);
        } else if ((a instanceof AABB2D) && (b instanceof AABB2D)) {
            return AABB2D_AABB2(a, b);
        } else if ((a instanceof OABB2D) && (b instanceof OABB2D)) {
            return OABB2D_OABB2D(a, b);
        } else {
            //finish
        }

    },

    BoundingSphere2D_BoundingSphere2D: function(a, b) {
        //Return truthy if intersecting
        return (a.r + b.r) * (a.r + b.r) < a.v.subtractF(b.v).lengthSquared();
    },

    AABB2D_AABB2: function(a, b) {
        return 2 * Math.abs(a.v.x - b.v.x) < a.hx + b.hx && 2 * Math.abs(a.v.y - b.v.y) < a.hy + b.hy;
    },

    OABB2D_OABB2D: function(a, b) {
        // body...
    }
};

//Define Collision Detector for 3D
HYDROGEN.CollisionDetector3D = function() {
    // body...
};
HYDROGEN.CollisionDetector3D.prototype = {

    constructor: HYDROGEN.CollisionDetector3D,

    checkForCollision: function(a, b) {
        if ((a instanceof BoundingSphere3D) && (b instanceof BoundingSphere3D)) {
            return BoundingSphere3D_BoundingSphere3D(a, b);
        } else if ((a instanceof AABB3D) && (b instanceof AABB3D)) {
            return AABB3D_AABB3D(a, b);
        } else if ((a instanceof OABB3D) && (b instanceof OABB3D))  {
            return OABB3D_OABB3D(a, b);
        } else {
            return false;
        }
    },

    BoundingSphere3D_BoundingSphere3D: function(a, b) {
        return (a.r + b.r) * (a.r + b.r) < a.v.subtractF(b.v).lengthSquared();
    },

    AABB3D_AABB3D: function(a, b) {
        return 2 * Math.abs(a.v.x - b.v.x) < a.hx + b.hx && 2 * Math.abs(a.v.y - b.v.y) < a.hy + b.hy && 2 * Math.abs(a.v.z - b.v.z) < a.hz + b.hz;
    },

    OABB3D_OABB3D: function(a, b) {
        return false;
    }
};

//Define 2D Scene object
HYDROGEN.Scene2D = function() {

};
HYDROGEN.Scene2D.prototype = {

};

//Define 3D Scene object
HYDROGEN.Scene3D = function() {

};
HYDROGEN.Scene3D.prototype = {

};

//Define 2D Object
// HYDROGEN.Object2D = function() {

// };
// HYRDOGEN.Object2D.prototype = {

//     constructor: HYDROGEN.Object2D,

//     //Physical properies
//     // var position = new Vector2();
//     // var velocity = new Vector2();
//     // var orientation = 0.0;
//     // var angular_velocity = 0.0;
//     // var mass = 0.0;
//     // var collision_geometry;

//     //Material properties

//     //Mesh

//     setPosition: function(x, y) {
//         this.position[0] = x;
//         this.position[1] = y
//     },

//     setVelocity: function(x, y) {
//         this.velocity[0] = x;
//         this.velocity[1] = y
//     },

//     setOrientation: function(alpha) {
//         this.orientation = alpha
//     },

//     setAngularVelocity: function(a) {
//         this.angular_velocity = a
//     },

//     setMass: function(m) {
//         this.mass = m
//     },

//     iterate: function(dt) {
//         this.position.addScaledVector(this.velocity, dt);
//         this.orientation += angular_velocity * dt
//     }
// };

//Define 3D Object
HYDROGEN.Object3D = function() {

};
HYDROGEN.Object3D.prototype = {

    constructor: HYDROGEN.Object3D,

    //Physical properies
    // var position = new Vector3();
    // var velocity = new Vector3();
    // var orientation = new Quarternion();
    // var angular_velocity = new Vector3();
    // var mass = new Matrix33();
    // var collision_geometry

    //Material properties


    //Mesh

};

//Define 2D camera object (viewport)
HYDROGEN.Camera2D = function() {

};
HYDROGEN.Camera2D.prototype = {

};

//Define 3D camera object
HYDROGEN.Camera3D = function() {

};

HYDROGEN.Camera3D.prototype = {

};

HYDROGEN.Shapes={};

HYDROGEN.Shapes.Cylinder = function(l, r, b, drawElements) {
    var length = l || 0.5; //half length
    var radius = r || 0.25; //radius
    var num = n || 10; //Number of vertices round circumference
    var vert = [];

    if (typeof drawElements === "undefined") {
        drawElements = "TRIANGLES"
    };

    switch (drawElements) {
        case "TRIANGLES":

            //Top disc
            for (var i = 0; i < num - 1; i++) {

                var xfrom = r * Math.sin(i * 2 * Math.PI / num);
                var xto = r * Math.sin((i + 1) * 2 * Math.PI / num);
                var yfrom = r * Math.cos(i * 2 * Math.PI / num);
                var yto = r * Math.cos((i + 1) * 2 * Math.PI / num);

                //Top disc
                vert[i] = new Vector3(0, 0, l);
                vert[i + 1] = new Vector3(xto, yto, l);
                vert[i + 2] = new Vector3(xfrom, yfrom, l);

                //Sides
                vert[i + 3] = new Vector3(xfrom, yfrom, l);
                vert[i + 4] = new Vector3(xto, yto, l);
                vert[i + 5] = new Vector3(xfrom, yfrom, -l);
                vert[i + 6] = new Vector3(xto, yto, l);
                vert[i + 7] = new Vector3(xto, yto, -l);
                vert[i + 8] = new Vector3(xfrom, yfrom, -l);

                //Bottom disc
                vert[i + 9] = new Vector3(0, 0, -l);
                vert[i + 10] = new Vector3(xfrom, yfrom, -l);
                vert[i + 11] = new Vector3(xto, yto, -l);

            };
            break;
        case "POINTS":
            //Generate vertices
            for (var i = 0; i < num - 1; i++) {
                var sin = Math.sin(2 * i * Math.PI / num);
                var cos = Math.cos(2 * i * Math.PI / num);
                vert[i] = new Vector3(r * sin, r * cos, l);
                vert[i + num] = new Vector3(r * sin, r * cos, -l);
            };
            break;
    }


    result = {};
    resut.draw_type = drawElements;
    result.vertices = vert;

    return result;

};

HYDROGEN.Shapes.Sphere = function(r, n, m) {
    var radius = r || 0.5;
    var latitude = n || 5;
    var longitude = m || 5;
    var vert = [];

    //Loop to generate vertices

    result = {};
    result.draw_type = "POINTS";
    result.vertices = vert;

    for (var i = 0; i < latitude; i++) {
        for (var j = 0; j < longitude - 1; j++) {
            vert[i * longitude + latitude] = new Vector3();
        };
    };

    result = {};
    resut.draw_type = "POINTS";
    result.vertices = vert;


    return result;
};

HYDROGEN.Shapes.Box = function(x, y, z, drawElements) {
    var x_half = x || 0.5;
    var y_half = y || 0.5;
    var z_half = z || 0.5;
    var vert = []

    if (typeof drawElements === "undefined") {
        drawElements = "TRIANGLES"
    };

    switch (drawElements) {
        case "TRIANGLES":
            //TOP
            // verts[0] = new Vector3(, , );
            // verts[1] = new Vector3(, , );
            // verts[2] = new Vector3(, , );
            // verts[3] = new Vector3(, , );
            // verts[4] = new Vector3(, , );
            // verts[5] = new Vector3(, , );
            // //Side 1
            // verts[6] = new Vector3(, , );
            // verts[7] = new Vector3(, , );
            // verts[8] = new Vector3(, , );
            // verts[9] = new Vector3(, , );
            // verts[10] = new Vector3(, , );
            // verts[11] = new Vector3(, , );
            // //Side 2
            // verts[12] = new Vector3(, , );
            // verts[13] = new Vector3(, , );
            // verts[14] = new Vector3(, , );
            // verts[15] = new Vector3(, , );
            // verts[16] = new Vector3(, , );
            // verts[17] = new Vector3(, , );
            // //Side 3
            // verts[18] = new Vector3(, , );
            // verts[19] = new Vector3(, , );
            // verts[20] = new Vector3(, , );
            // verts[21] = new Vector3(, , );
            // verts[22] = new Vector3(, , );
            // verts[23] = new Vector3(, , );
            // //Side 4
            // verts[24] = new Vector3(, , );
            // verts[25] = new Vector3(, , );
            // verts[26] = new Vector3(, , );
            // verts[27] = new Vector3(, , );
            // verts[28] = new Vector3(, , );
            // verts[29] = new Vector3(, , );
            // //Bottom
            // verts[30] = new Vector3(, , );
            // verts[31] = new Vector3(, , );
            // verts[32] = new Vector3(, , );
            // verts[33] = new Vector3(, , );
            // verts[34] = new Vector3(, , );
            // verts[35] = new Vector3(, , );

            break;
        case "POINTS":
            vert[0] = new Vector3(x_half, y_half, z_half);
            vert[1] = new Vector3(-x_half, +y_half, z_half);
            vert[2] = new Vector3(-x_half, -y_half, z_half);
            vert[3] = new Vector3(x_half, -y_half, z_half);
            vert[4] = new Vector3(x_half, y_half, -z_half);
            vert[5] = new Vector3(-x_half, y_half, -z_half);
            vert[6] = new Vector3(-x_half, -y_half, -z_half);
            vert[7] = new Vector3(x_half, -y_half, -z_half);
            break;
    }


    result = {};
    resut.draw_type = drawElements;
    result.vertices = vert;

    return result;

}
