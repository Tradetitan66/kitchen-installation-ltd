export const BUSINESS = {
  name: "Kitchen Installation Team",
  phoneDisplay: "07843 307 319",
  phoneIntl: "+447843307319",
  whatsappNumber: "447843307319",
  address: "Baird's Way, Bonnyrigg EH19 3NS",
  locality: "Bonnyrigg, Midlothian",
  mapsUrl:
    "https://www.google.com/maps/place/?q=place_id:ChIJx_aiaOi-h0gRVdCNHphIFmI",
  rating: "5.0",
  reviewCount: 34,
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildEnquiryMessage(input: {
  name: string;
  postcode: string;
  projectType: string;
  message: string;
}): string {
  const lines = [
    "Hi Kitchen Installation Team,",
    "",
    "I'd like to enquire about a project.",
    "",
    `Name: ${input.name}`,
    `Postcode: ${input.postcode}`,
    `Project type: ${input.projectType}`,
  ];
  if (input.message.trim()) {
    lines.push("", `Your message: ${input.message.trim()}`);
  }
  lines.push("", "Sent from the Kitchen Installation Team website.");
  return lines.join("\n");
}

export const PROJECT_TYPES = [
  "Kitchen Installation",
  "Full Kitchen Renovation",
  "Bathroom",
] as const;