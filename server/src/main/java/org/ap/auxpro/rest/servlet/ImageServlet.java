package org.ap.auxpro.rest.servlet;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.*;
import org.glassfish.jersey.media.multipart.FormDataParam;
import java.io.InputStream;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import java.io.IOException;
import org.ap.web.server.IFileServer;
import org.ap.web.server.FileServer;
import java.io.ByteArrayOutputStream;
import org.ap.auxpro.internal.EConfigProperties;

/* This class was auto-generated by the JavaWriter */
@Path("/image")
public class ImageServlet {

	public static final String PATH = "/image";
	private IFileServer _fileServer;

	public ImageServlet() {
		_fileServer = new FileServer(EConfigProperties.FILES_ROOT.getValue());
	}

	@GET
	@Path("{id}")
	@Produces({"image/png", "image/jpeg", "image/jpg"})
	public Response getImage(@Context SecurityContext sc, @PathParam("id") final String id) {
		try {
			return Response.ok(_fileServer.getFile(id)).build();
		} catch (IOException e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces({MediaType.APPLICATION_JSON})
	public Response postImage(@Context SecurityContext sc, @FormDataParam("file") InputStream uploadedInputStream, @FormDataParam("file") FormDataContentDisposition fileDetail) {
		try {
			String id = _fileServer.storeFile(fileDetail.getFileName(), toByteArray(uploadedInputStream));
			return Response.status(Status.CREATED).entity("{\"id\": \"" + id + "\"}").build();
		} catch (IOException e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	public byte[] toByteArray(InputStream is) throws IOException {
		ByteArrayOutputStream buffer = new ByteArrayOutputStream();
		int nRead;
		byte[] data = new byte[16384];
		while ((nRead = is.read(data, 0, data.length)) != -1) {
			buffer.write(data, 0, nRead);
		}
		buffer.flush();
		return buffer.toByteArray();
	}

}
