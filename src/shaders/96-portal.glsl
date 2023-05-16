uniform float uTime;
varying vec2  vUv;

#define NUM_CIRCLES 40

struct Circle {
  vec2  position;
  float radius;
  vec2  velocity;
};

bool initiated = false;

Circle circles[NUM_CIRCLES];

float random() {
  return fract(sin(uTime) * 43758.5453);
}

void main() {
    if (initiated == false) {
        initiated = true;
        for (int i = 0; i < NUM_CIRCLES; i++) {
            // Inicializar posición, radio y velocidad aleatoriamente
            circles[i].position = vec2(random(), random()) * 2.0 - 1.0;
            circles[i].radius = random() * 0.1 + 0.05;
            circles[i].velocity = normalize(circles[i].position) * (random() * 0.02 + 0.01);
        }        
    }

    // Actualizar y animar los círculos
    for (int i = 0; i < NUM_CIRCLES; i++) {
        // Actualizar la posición del círculo
//        circles[i].position += circles[i].velocity * 0.1;
        
        // Verificar si el círculo ha salido de la pantalla
/*        if (circles[i].position.x < -1.0 || circles[i].position.x > 1.0 ||
            circles[i].position.y < -1.0 || circles[i].position.y > 1.0) {
            // Colocar el círculo en una posición aleatoria nuevamente
            circles[i].position = vec2(random(), random()) * 2.0 - 1.0;
            circles[i].velocity = normalize(circles[i].position) * (random() * 0.02 + 0.01);
        }*/
        
        // Dibujar el círculo en el fragmento actual si está dentro del radio
        float dist = length(vUv.xy - (circles[i].position * 0.5 + 0.5));
        if (dist < circles[i].radius) {
            // Dibujar el círculo con el color deseado
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
            return;
        }
    }
  
    // Si no se encuentra un círculo en el fragmento, dibujar el fondo en su lugar
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);    
}