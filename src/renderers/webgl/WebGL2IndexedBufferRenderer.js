/**
 * @author mrdoob / http://mrdoob.com/
 */

function WebGL2IndexedBufferRenderer( gl, extensions, infoRender ) {

	var mode;

	function setMode( value ) {

		mode = value;

	}

	var type, bytesPerElement;

	function setIndex( value ) {

		type = value.type;
		bytesPerElement = value.bytesPerElement;

	}

	function render( start, count ) {

		gl.drawElements( mode, count, type, start * bytesPerElement );

		infoRender.calls ++;
		infoRender.vertices += count;

		if ( mode === gl.TRIANGLES ) infoRender.faces += count / 3;
		else if ( mode === gl.POINTS ) infoRender.points += count;

	}

	function renderInstances( geometry, start, count ) {

		extension.drawElementsInstanced( mode, count, type, start * bytesPerElement, geometry.maxInstancedCount );

		infoRender.calls ++;
		infoRender.vertices += count * geometry.maxInstancedCount;

		if ( mode === gl.TRIANGLES ) infoRender.faces += geometry.maxInstancedCount * count / 3;
		else if ( mode === gl.POINTS ) infoRender.points += geometry.maxInstancedCount * count;

	}

	//

	this.setMode = setMode;
	this.setIndex = setIndex;
	this.render = render;
	this.renderInstances = renderInstances;

}


export { WebGL2IndexedBufferRenderer };
