import { Container, Title, Text, Button, Group } from "@mantine/core";
import { Illustration } from "./components/Illustration";
import classes from "./css/ServerOverload.module.css";
import { useNavigate } from "react-router-dom";
import colors from "../../lib/color/colors";

export function ServerOverload() {
  const navigate = useNavigate();
  const destination = localStorage.getItem("error");
  return (
    <div className={classes.root}>
      <Container h={"100vh"}>
        <div
          className={classes.inner}
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Illustration className={classes.image} />
          <div className={classes.content} style={{}}>
            <Title className={classes.title}>All of our servers are busy</Title>
            <Text size="lg" ta="center" style={{ color: colors.white }}>
              We cannot handle your request right now, please wait for a couple
              of minutes and refresh the page. Our team is already working on
              this issue.
            </Text>
            <Group justify="center">
              <Button
                size="md"
                variant="white"
                onClick={() => navigate(`${destination}`)}
              >
                Refresh the page
              </Button>
            </Group>
          </div>
        </div>
      </Container>
    </div>
  );
}
