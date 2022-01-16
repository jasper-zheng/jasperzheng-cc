export default `
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

float awCircle1( in vec2 p, in float r ,in float x) {
  vec2 m = vec2(p.x,p.y);
  float angle = atan(p.x*(1.0+sin(time)*0.3),p.y);
  return length(m)*(1.0+sin(angle*3.0+time*0.8)*0.04)*
                   (1.0+cos(angle*2.0-time*1.4)*0.03)*
                   (1.0+cos(angle-time*0.7+9.0)*0.008)
                   -r;
}

float awCircle2( in vec2 p, in float r ,in float x) {
  vec2 m = vec2(p.x,p.y);
  float angle = atan(p.x*(1.0+sin(time*1.1)*0.3),p.y);
  return length(m)*(1.0+sin(angle*1.0-time*0.9+3.0)*0.06)*
                   (1.0+cos(angle*2.0+time*1.1+1.0)*0.03)
                   -r;
}

void main(void){
  vec2 p1 = (2.0*gl_FragCoord.xy-resolution.xy)/resolution.y;
  float d1 = awCircle1(p1,0.85,gl_FragCoord.x/resolution.x);
  //vec3 sp1 = mix( vec3(251.0/255.0)/3.0, vec3(0.0), 1.0-smoothstep(0.003,0.0035,abs(d1)) );
  vec4 sp1 = mix( vec4(vec3(0.0),0.0), vec4(vec3(251.0/255.0),1.0), 1.0-smoothstep(0.0015,0.003,abs(d1)) );

  vec2 p2 = (2.0*gl_FragCoord.xy-resolution.xy)/resolution.y;
  p2.x -= 0.08;
  // p2.y += 0.04;
  float d2 = awCircle2(p2,0.85,gl_FragCoord.x/resolution.x);
  //vec3 sp2 = mix( vec3(251.0/255.0)/3.0, vec3(0.0), 1.0-smoothstep(0.003,0.0035,abs(d2)) );
  vec4 sp2 = mix( vec4(vec3(0.0),0.0), vec4(vec3(251.0/255.0),1.0), 1.0-smoothstep(0.0015,0.003,abs(d2)) );

  vec2 p3 = (2.0*gl_FragCoord.xy-resolution.xy)/resolution.y;
  p3.x -= 0.6*(1.0+sin(time*0.9)*0.05);
  p3.y += 0.3*(1.0+sin(time*0.8)*0.04);
  float d3 = awCircle2(p3,0.07,gl_FragCoord.x/resolution.x);
  //vec3 sp3 = mix( vec3(251.0/255.0)/3.0, vec3(0.0), 1.0-smoothstep(0.003,0.0035,abs(d3)) );
  vec4 sp3 = mix( vec4(vec3(0.0),0.0), vec4(vec3(251.0/255.0),1.0), 1.0-smoothstep(0.0015,0.003,abs(d3)) );

  gl_FragColor = vec4(251.0/255.0 - (sp1+sp2+sp3)*0.8);
}
`
