// 3x3 plane:
//
//  0   1   2   3
//  4   5   6   7
//  8   9  10  11
// 12  13  14  15
function createPlane (sx, sy, nx, ny, options) {
  sx = sx || 1
  sy = sy || 1
  nx = nx || 1
  ny = ny || 1
  var quads = (options && options.quads) ? options.quads : false

  var positions = []
  var uvs = []
  var normals = []
  var cells = []

  for (var iy = 0; iy <= ny; iy++) {
    for (var ix = 0; ix <= nx; ix++) {
      var u = ix / nx
      var v = iy / ny
      var x = -sx / 2 + u * sx // starts on the left
      var y = sy / 2 - v * sy // starts at the top
      positions.push([x, y, 0])
      uvs.push([u, 1.0 - v])
      normals.push([0, 0, 1])
      if (iy < ny && ix < nx) {
        if (quads) {
          cells.push([iy * (nx + 1) + ix, (iy + 1) * (nx + 1) + ix, (iy + 1) * (nx + 1) + ix + 1, iy * (nx + 1) + ix + 1])
        } else {
          cells.push([iy * (nx + 1) + ix, (iy + 1) * (nx + 1) + ix + 1, iy * (nx + 1) + ix + 1])
          cells.push([(iy + 1) * (nx + 1) + ix + 1, iy * (nx + 1) + ix, (iy + 1) * (nx + 1) + ix])
        }
      }
    }
  }

  return {
    positions: positions,
    normals: normals,
    uvs: uvs,
    cells: cells
  }
}

module.exports = createPlane
