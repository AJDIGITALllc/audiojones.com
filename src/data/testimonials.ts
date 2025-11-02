export interface Testimonial {
  name: string
  role: string
  quote: string
  image: string
}

export const testimonials: Testimonial[] = [
  {
    name: "Peggy Clemons",
    role: "Recording Artist",
    quote: "Audio Jones helped us modernize release, content, and funnel. The AI assets made it easy to stay consistent.",
    image: "/assets/clients/peggy-clemons.jpg"
  },
  {
    name: "Abebe Lewis",
    role: "Circle House Studios", 
    quote: "We needed a system, not just content. This is the first time the entire studio offering is mapped to automations.",
    image: "/assets/clients/abebe-lewis.jpg"
  },
  {
    name: "Florida Ramp & Lift",
    role: "Service Business",
    quote: "Local SEO + Google Business Ultra is keeping the pipe full.",
    image: "/assets/clients/florida-ramp-lift.jpg"
  }
]