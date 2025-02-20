import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Endpoint para obtener los cursos de un mentor por su id
app.get('/api/mentors/:id/courses', (req, res) => {
  import('fs').then(fs => {
    const filePath = resolve(process.cwd(), 'src/assets/courses.json');
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo JSON:', err);
        res.status(500).json({ error: 'Error al obtener los cursos' });
      } else {
        const mentors = JSON.parse(data);
        const mentorId = parseInt(req.params.id, 10);
        const mentor = mentors.find((m: any) => m.id === mentorId);
        if (mentor) {
          res.json({
            mentor: mentor.nombre,
            correo: mentor.correo,
            cursos: mentor.cursos
          });
        } else {
          res.status(404).json({ error: 'Mentor no encontrado' });
        }
      }
    });
  });
});

// Endpoint para obtener un curso por ID, pero solo del mentor autenticado
app.get('/api/courses/:mentorId/course/:id', (req, res) => {
  import('fs')
    .then(fs => {
      const filePath = resolve(process.cwd(), 'src/assets/courses.json');

      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          console.error('Error al leer el archivo JSON:', err);
          return res.status(500).json({ error: 'Error al obtener el curso' });
        }

        try {
          const mentors = JSON.parse(data);
          const courseId = parseInt(req.params.id, 10);
          const mentorId = parseInt(req.params.mentorId, 10);

          if (isNaN(mentorId) || isNaN(courseId)) {
            return res.status(400).json({ error: 'Parámetros inválidos' });
          }

          // Buscar el mentor autenticado
          const mentor = mentors.find((m: any) => m.id === mentorId);
          if (!mentor) {
            return res.status(404).json({ error: 'Mentor no encontrado' });
          }

          // Buscar el curso dentro de los cursos del mentor
          const course = mentor.cursos.find((c: any) => c.id === courseId);
          if (course) {
            return res.json({
              ...course,
              mentor: { id: mentor.id, nombre: mentor.nombre, correo: mentor.correo },
            });
          } else {
            return res.status(404).json({ error: 'Curso no encontrado en este mentor' });
          }
        } catch (parseError) {
          console.error('Error al parsear JSON:', parseError);
          return res.status(500).json({ error: 'Error al procesar los datos' });
        }
      });
    })
    .catch(err => {
      console.error('Error al importar fs:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    });
});


/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
