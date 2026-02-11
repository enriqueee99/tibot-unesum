export default function Home() {
  return (
    // Mantenemos tu etiqueta <main> y tus clases originales
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* HERO - Punto 1 y 2 del Word */}
      <section id="inicio" className="bg-[#003366] text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">TI-Bot UNESUM</h1>
          <p className="text-lg md:text-xl opacity-90">
            Asistente virtual para atención de inquietudes y consultas
            académicas de la carrera de TI.
          </p>
        </div>
      </section>

      {/* INFO / SECCIONES - Basado en los puntos del documento */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {/* PRÁCTICAS - Puntos 3 y 4 */}
          <div
            id="practicas"
            className="bg-white rounded-xl shadow p-6 border-t-4 border-[#003366]"
          >
            <h3 className="font-semibold text-lg mb-2">
              Prácticas y Vinculación
            </h3>
            <p className="text-gray-600 text-sm">
              Información sobre lugares de aplicación, convenios y procesos de
              matrices.
            </p>
          </div>

          {/* BIBLIOTECA - Puntos 7 y 8 */}
          <div
            id="biblioteca"
            className="bg-white rounded-xl shadow p-6 border-t-4 border-[#003366]"
          >
            <h3 className="font-semibold text-lg mb-2">
              Biblioteca y Recursos
            </h3>
            <p className="text-gray-600 text-sm">
              Consulta horarios, uso de computadoras, préstamo de libros y
              acceso a Urkund.
            </p>
          </div>

          {/* ADMISIÓN - Puntos 13 y 14 */}
          <div
            id="admision"
            className="bg-white rounded-xl shadow p-6 border-t-4 border-[#003366]"
          >
            <h3 className="font-semibold text-lg mb-2">Admisión y Matrícula</h3>
            <p className="text-gray-600 text-sm">
              Requisitos de ingreso, procesos de homologación y fechas de
              matriculación.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN ADICIONAL PARA BIENESTAR - Punto 25 */}
      <section id="bienestar" className="py-8 bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="font-semibold text-xl text-[#003366] mb-2">
            Bienestar Estudiantil
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Información sobre solicitudes de becas, consultorio médico y
            servicios de apoyo académico.
          </p>
        </div>
      </section>
    </main>
  );
}
