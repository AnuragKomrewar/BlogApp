import { Box, styled, Typography, Link } from "@mui/material";
import { GitHub, Instagram, Email } from "@mui/icons-material";

const Banner = styled(Box)`
  background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
  width: 100%;
  height: 50vh;
  background-position: left 0px bottom 0px;
  background-size: cover;
`;

const Wrapper = styled(Box)`
  padding: 20px;
  & > h3,
  & > h5 {
    margin-top: 50px;
  }
`;

const Text = styled(Typography)`
  color: #878787;
`;

const About = () => {
  return (
    <Box>
      <Banner />
      <Wrapper>
        <Typography variant="h3">About Me</Typography>
        <Text variant="h5">
        "Welcome to Photo-Blog! I'm Anurag, the passionate mind behind this creative space.
          <br />
          As an avid tech enthusiast, I've always believed in the power of words and their ability to inspire change.
           Through this blog, I strive to create a platform that fosters meaningful discussions, empowers readers, and encourages personal growth.
            Here, you'll find a treasure trove of thought-provoking articles, helpful resources, and engaging stories. 
          Let's embark on this adventure together and make a positive impact on the world!"
          
        </Text>
        <Text variant="h5">
          Need something built or simply want to have chat? Reach out to me on 
          <Box component="span" style={{ marginLeft: 5 }}>
            <Link
              href="https://www.instagram.com/anuragkomrewar/"
              color="inherit"
              target="_blank"
            >
              <Instagram />
            </Link>
          </Box>
          <span> </span> or send me an Email <span> </span> 
          <Link
            href="mailto:anuragkomrewar1@gmail.com?Subject=This is a subject"
            target="_blank"
            color="inherit"
          >
            <Email />
          </Link>
          .
        </Text>
      </Wrapper>
    </Box>
  );
};

export default About;
