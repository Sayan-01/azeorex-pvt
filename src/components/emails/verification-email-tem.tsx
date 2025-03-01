import { Html, Head, Body, Container, Heading, Text } from "@react-email/components";

export const EmailTemplate = ({ firstName, varifiedToken }: { firstName: string; varifiedToken: string }) => (
  <Html>
    <Head lang="en" dir="ltr"/>
    <Body style={{ backgroundColor: "#f9f9f9", padding: "20px", textAlign: "center"  }}>
      <Container style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", maxWidth: "400px", margin: "auto"  ,height: "fit-content"}}>
        <Heading style={{ fontSize: "2rem", fontWeight: "800", color: "#4a4a4a" }}>Azeorex</Heading>
        <Heading
          as="h3"
          style={{ color: "#27272a", fontSize: "1.125rem", fontWeight: "600" }}
        >
          Confirm your email!
        </Heading>
        <Text style={{ color: "#71717a", fontSize: "0.875rem" }}>Thanks! Please use the following code to complete your registration.</Text>
        <div style={{ backgroundColor: "#ECE3FF", borderRadius: "8px", padding: "12px 24px", margin: "1rem 0", letterSpacing: "6px", color: "#27272a", fontSize: "1.125rem", fontWeight: "600" }}>
          {varifiedToken}
        </div>
        <Text style={{ color: "#444", fontSize: "0.875rem" }}>This code is valid for 1 hr</Text>
      </Container>
    </Body>
  </Html>
);
