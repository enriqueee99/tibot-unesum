export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tibot UNESUM</h1>
          <p className="text-lg md:text-xl opacity-90">
            Asistente virtual para estudiantes y comunidad universitaria
          </p>
        </div>
      </section>

      {/* INFO */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-lg mb-2">
              Información académica
            </h3>
            <p className="text-gray-600 text-sm">
              Respuestas rápidas sobre carreras, procesos y servicios.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-lg mb-2">Asistencia 24/7</h3>
            <p className="text-gray-600 text-sm">
              Disponible en cualquier momento desde esta plataforma.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-lg mb-2">Interfaz simple</h3>
            <p className="text-gray-600 text-sm">
              Diseñada para una experiencia clara y accesible.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
