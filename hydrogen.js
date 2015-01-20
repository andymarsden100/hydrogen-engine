/*
HYDROGEN.JS

Comments:

    Functions flagged with an F e.g. addF(), are purely functional, in that they do
    not alter the object on which they are called and have no side effects

*/

//Create Hydrogen object
var HYDROGEN = HYDROGEN || {}

HYDROGEN.prototype {

    var gl;
    var canvas;
    var shaderProgram;
    //var shaderPrograms={}
    var shaderVertexPositionAttribute;
    var shaderProjectionMatrixUniform;
    var shaderModelViewMatrixUniform;

    //Shader section
    var vSh_simple = {
        type: "vertex",
        str: "    attribute vec3 vertexPos;\n" +
            "    uniform mat4 modelViewMatrix;\n" +
            "    uniform mat4 projectionMatrix;\n" +
            "    void main(void) {\n" +
            "		// Return the transformed and projected vertex value\n" +
            "        gl_Position = projectionMatrix * modelViewMatrix * \n" +
            "            vec4(vertexPos, 1.0);\n" +
            "    }\n"
    };

    var fSh_simple = {
        type: "fragment",
        str: "    void main(void) {\n" +
            "    // Return the pixel color: always output white\n" +
            "    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n" +
            "}\n"
    };

    //Default objects

    var square_v_ts = [
        .5, .5, 0.0, -.5, .5, 0.0,
        .5, -.5, 0.0, -.5, -.5, 0.0
    ];

    quickStart: function(canvas_name) {
            initWebGL(canvas_name);
            initViewPort()
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
            this.canvas = canvas
        },

        initViewPort: function() {
            this.gl.viewport(0, 0, canvas.width, canvas.height)
        },

        createShader: function(str, type) {
            var shader;
            if (type == 'fragment') {
                shader = gl.createShader(gl.FRAGMENT_SHADER);
            } else if (type == 'vertex') {
                shader = gl.createShader(gl.VERTEX_SHADER);
            } else {
                return null;
            }

            gl.shaderSource(shader, str);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                alert(gl.getShaderInfoLog(shader));
                return null;
            }

            return shader
        },

        initShader: function(fragmentSS, vertexSS) {
            var fragmentShader = createShader(gl, fragmentSS, "fragment");
            var vertexShader = createShader(gl, vertexSS, "vertex");

            // link them together into a new program
            shaderProgram = gl.createProgram();
            gl.attachShader(shaderProgram, vertexShader);
            gl.attachShader(shaderProgram, fragmentShader);
            gl.linkProgram(shaderProgram);

            // get pointers to the shader params
            shaderVertexPositionAttribute = gl.getAttribLocation(shaderProgram, "vertexPos");
            gl.enableVertexAttribArray(shaderVertexPositionAttribute);

            shaderProjectionMatrixUniform = gl.getUniformLocation(shaderProgram, "projectionMatrix");
            shaderModelViewMatrixUniform = gl.getUniformLocation(shaderProgram, "modelViewMatrix");


            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                alert("Could not initialise shaders");
            }
        }


};

//Define Vector2
HYDROGEN.Vector2 = function(a, b) {
    this.x = a || 0;
    this.y = b || 0
};
HYDROGEN.Vector2.prototype {
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
        return this
    },

    addScalar: function(a) {
        this.x += a;
        this.y += a;
        return this
    },

    subtract: function(a) {
        this.x -= a.x;
        this.y -= a.y;
        return this
    },

    subtractF: function(a) {
        return new Vector2(this.x - a.x, this.y - a.y)
    },

    multiplyScalar: function(a) {
        this.x *= a;
        this.y *= a;
        return this
    },

    addScaledVector: function(v, a) {
        this.x += a * v.x;
        this.y += a * v.y;
        return this
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
HYDROGEN.Vector3.prototype {

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
        this.z += a * v.z
    },

    addScaledVectorF: function(v, a) {
        return new Vector3(
            this.x + v.x * a,
            this.y + v.y * a,
            this.z + v.z * a
        )
    },

    divideScalar: function(a) {
        a ? (this.x /= a, this.y /= a, this.z /= a) : this.z = this.y = this.x = 0: ;
    },

    divideScalarF: function(a) {
        a ?
            return new Vector3(this.x /= a, this.y /= a, this.z /= a): return new Vector3(0, 0, 0)
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
        this.z = m[6] * $x + m[7] * $y + m[8] * $z
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
HYDROGEN.Vector4.prototype {

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

    addScaledVector: function(v, a) {
        this.x += a * v.x;
        this.y += a * v.y;
        this.z += a * v.z;
        this.w += a * v.w;
        return this
    },

    divideScalar: function(a) {
        a ? (this.x /= a, this.y /= a, this.z /= a, this.w /= a) : this.w = this.z = this.y = this.x = 0;
        return this
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
        this.w = m[12] * $x + m[13] * $y + m[14] * $z + m[15] * $w
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
HYDROGEN.Matrix22.prototype {

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
        this.m[3] *= a
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
        this.m[3] = m.m[2] * b + m.m[3] * d

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
    }
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
        this.m[8] = c
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
        v.z = this.m[6] * a + this.m[7] * b + this.get[8] * c
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
        return this;
        h
    }

        get: function(i) {
        return this.m[i]
    }

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
    },

    multiplyMatrix44: function(m) {
        // body...
    },

    multiplyMatrix44F: function(m) {
        // body...
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

            if xmax == void 0 ? xmax = x : if x > xmax ? xmax = x;
            if ymax == void 0 ? ymax = y : if y > ymax ? ymax = y;
            if zmax == void 0 ? zmax = z : if z > zmax ? zmax = z;

            if xmin == void 0 ? xmin = x : if x < xmin ? xmin = x;
            if ymin == void 0 ? ymin = y : if y < ymin ? ymin = y;
            if zmin == void 0 ? zmin = z : if z < zmin ? zmin = z;
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
    if p !== void 0 ? this.p = p : this.p = new Vector3();
    if n !== void 0 ? this.n = n : this.n = new Vector3(0, 0, 1)
};
HYDROGEN.BoundingPlane3D.prototype = {
    constructor: HYDROGEN.BoundingPlane3D
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

            if xmax == void 0 ? xmax = x : if x > xmax ? xmax = x;
            if ymax == void 0 ? ymax = y : if y > ymax ? ymax = y;

            if xmin == void 0 ? xmin = x : if x < xmin ? xmin = x;
            if ymin == void 0 ? ymin = y : if y < ymin ? ymin = y;
        };

        this.hx = (xmax - xmin) / 2;
        this.hy = (ymax - ymin) / 2;

        this.v = new Vector2(
            xmin + this.hx,
            ymin + this.hy,
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
    if p !== void 0 ? this.p = p : this.p = new Vector2();
    if n !== void 0 ? this.n = n : this.n = new Vector2(0, 1)
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
    constructor: HYDROGEN.CollisionDetector2D

        checkForCollision: function(a, b) {
        // body...
        if a instanceof BoundingSphere2D && b instanceof BoundingSphere2D {
            return BoundingSphere2D_BoundingSphere2D(a, b);
        } else if a instanceof AABB2D && b instanceof AABB2D {
            return AABB2D_AABB2(a, b);
        } else if a instanceof OABB2D && b instanceof OABB2D {
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
    function checkForCollision(a, b) {
            if a instanceof BoundingSphere3D && b instanceof BoundingSphere3D {
                return BoundingSphere3D_BoundingSphere3D(a, b);
            } else if a instanceof AABB3D && b instanceof AABB3D {
                return AABB3D_AABB3D(a, b);
            } else if c {
                return OABB3D_OABB3D(a, b);
            } else {
                return false;
            }
        },

        function BoundingSphere3D_BoundingSphere3D(a, b) {
            return (a.r + b.r) * (a.r + b.r) < a.v.subtractF(b.v).lengthSquared();
        },

        function AABB3D_AABB3D(a, b) {
            return 2 * Math.abs(a.v.x - b.v.x) < a.hx + b.hx && 2 * Math.abs(a.v.y - b.v.y) < a.hy + b.hy && 2 * Math.abs(a.v.z - b.v.z) < a.hz + b.hz;
        },

        function OABB3D_OABB3D(a, b) {
            return false;
        }
};
