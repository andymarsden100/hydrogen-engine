//Create Hydrogen object
var HYDROGEN = HYDROGEN || {}

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
        return this.x;
    },

    getY: function() {
        return this.y;
    }

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
        return new Vector2(this.x - a.x, this.y - a.y);
    }

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
        return this.divideScalar(this.length)
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
            this.z - a.z,
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

    divideScalar: function(a) {
        a ? (this.x /= a, this.y /= a, this.z /= a) : this.z = this.y = this.x = 0;
        return this
    },

    divideScalar: function(a) {
        a ?
            return new Vector3(this.x /= a, this.y /= a, this.z /= a);
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
        //Multiply by matrix and change vector
    },

    multiplyMatrix33F: function(m) {
        //Multiply by matrix and return new vector
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

    copy: function(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = a.w != void 0 ? a.w : 1;
        return this
    },

    clone: function() {
        return new wHYDROGEN.Vector4(this.x, this.y, this.z, this.w)
    },

    add: function(a) {
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        this.w += a.w;
        return this
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

    setLength: function(l) {
        return this.normalise().multiplyScalar(l)
    },

    multiplyMatrix44: function(m) {
        //Multiply by matrix and change vector
    },

    multiplyMatrix44F: function(m) {
        //Multiply by matrix and return new vector
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
        this.m[3] *= a;
        return this
    },

    multiplyMatrix22: function(m) {
        this.m[0] = a;
        this.m[1] = b;
        this.m[2] = c;
        this.m[3] = d;
        m.get(0) = k;
        m.get(1) = l;
        m.get(2) = m;
        m.get(3) = n;
        this.m[1] = k * a + l * c;
        this.m[2] = k * b + l * d;
        this.m[3] = m * a + n * c;
        this.m[4] = m * b + n * d;
        return this
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
        return this
    },

    get: function(i) {
        return i < 9 ? this.m[i] : 0
    },

    multiplyMatrix33: function(m) {
        var a, b, c;
        a = m.get(0) * this.m[0] + m.get(0) * this.m[1] + m.get(0) * this.m[2];
        b = m.get(1) * this.m[3] + m.get(1) * this.m[4] + m.get(1) * this.m[5];
        c = m.get(2) * this.m[6] + m.get(2) * this.m[7] + m.get(2) * this.m[8];
        m[0] = a;
        m[1] = b;
        m[2] = c;

        a = m.get(3) * this.m[0] + m.get(3) * this.m[1] + m.get(3) * this.m[2];
        b = m.get(4) * this.m[3] + m.get(4) * this.m[4] + m.get(4) * this.m[5];
        c = m.get(5) * this.m[6] + m.get(5) * this.m[7] + m.get(5) * this.m[8];
        m[3] = a;
        m[4] = b;
        m[5] = c;

        a = m.get(6) * this.m[0] + m.get(6) * this.m[1] + m.get(6) * this.m[2];
        b = m.get(7) * this.m[3] + m.get(7) * this.m[4] + m.get(7) * this.m[5];
        c = m.get(8) * this.m[6] + m.get(8) * this.m[7] + m.get(8) * this.m[8];
        m[6] = a;
        m[7] = b;
        m[8] = c;

        return this
    },

    multiplyVector3: function(v) {
        a = v.x;
        b = v.y;
        c = v.z;
        v.x = this.get(0) * a + this.get(1) * b + this.get(2) * c;
        v.y = this.get(3) * a + this.get(4) * b + this.get(5) * c;
        v.z = this.get(6) * a + this.get(7) * b + this.get(8) * c;
        return v
    }
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
    }
};

HYDROGEN.Quarternion = function(a, b, c, d) {
    this.a = a || 0;
    this.b = b || 0;
    this.c = c || 0;
    this.d = d || 0;
};
HYDROGEN.Quarternion.prototype = {
    constructor: HYDROGEN.Quarternion
        //TO COMPLETE
};

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

HYDROGEN.BoundingCylinder3D = function() {
    // body...
};
HYDROGEN.BoundingCylinder3D.prototype = {
    constructor: HYDROGEN.BoundingCylinder3D
};

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

HYDROGEN.OABB2D = function(p, q, hx, hy) {
    this.p = p;
    this.q = q;
    this.hx = hx;
    this.hy = hy;
};
HYDROGEN.OABB2D.prototype = {
    constructor: HYDROGEN.OABB2D
};

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

HYDROGEN.CollisionDetector2D = function() {
    // body...
};
HYDROGEN.CollisionDetector2D.prototype = {
    constructor: HYDROGEN.CollisionDetector2D

        checkForCollision: function(a, b) {
        // body...

    },

    BoundingSphere_2DBoundingSphere2D: function(a, b) {
        //Return truthy if intersecting
        return (a.r + b.r) * (a.r + b.r) < a.v.subtractF(b.v).lengthSquared();
    },

    AABB2D_AABB2: function(a, b) {
        var a_xmax, a_xmin;
        var b_xmax, b_xmin;
        var a_ymax, a_ymin;
        var b_ymax, b_ymin;
        var av, bv;

        av = a.getV();
        bv = b.getV();

        a_xmin = a_xmax = av.getX();
        a_xmax += a.getHX();
        a_xmin -= a.getHX();

        b_xmin = b_xmax = bv.getX();
        b_xmax += b.getHX();
        b_xmin -= b.getHX();

        a_ymin = a_ymax = av.getY();
        a_ymax += a.getHY();
        a_ymin -= a.getHY();

        b_ymin = b_ymax = bv.getY();
        b_ymax += b.getHY();
        b_ymin -= b.getHY();

        return a_xmax > b_xmin && a_xmin > b_xmax || a_ymax > b_ymin && a_ymin > b_ymax ? !1 : !0;

    },

    OABB3D_OABB3D: function(a, b) {
        // body...
    }
};
