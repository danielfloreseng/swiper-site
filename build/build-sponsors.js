const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const downloadImage = (image) => {
  const { url, fileName } = image.fields.file;
  return new Promise((resolve, reject) => {
    fetch(`https:${url}`)
      .then((res) => {
        return res.buffer();
      })
      .then((buffer) => {
        try {
          fs.writeFileSync(
            path.resolve(__dirname, '../public/images/sponsors', fileName),
            buffer
          );
        } catch (err) {
          reject(err);
        }
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getSponsor = (item) => {
  return new Promise((resolve, reject) => {
    const { title, link, plan, ref, image, imageHorizontal } = item.fields;
    const downloads = [];
    if (image) downloads.push(downloadImage(image));
    if (imageHorizontal) downloads.push(downloadImage(imageHorizontal));
    Promise.all(downloads)
      .then(() => {
        const sponsor = {
          title,
          link,
          plan,
          ref,
          image: image ? image.fields.file.fileName : '',
          image_h: imageHorizontal ? image.fields.file.fileName : '',
        };
        resolve(sponsor);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const buildSponsors = async () => {
  let spaceId;
  let accessToken;

  try {
    fs.readFileSync(path.resolve(__dirname, '../.env.local'), 'utf-8')
      .trim()
      .split('\n')
      .forEach((line) => {
        const [key, value] = line.split('=');
        if (key === 'CONTENTFUL_SPACE_ID') spaceId = value;
        if (key === 'CONTENTFUL_ACCESS_TOKEN') accessToken = value;
      });
  } catch (err) {
    spaceId = process.env.CONTENTFUL_SPACE_ID;
    accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  }

  if (!spaceId && !accessToken) {
    fs.writeFileSync(
      path.resolve(__dirname, '../src/shared/sponsors-list.js'),
      'export default [];'
    );
    return;
  }

  const client = require('contentful').createClient({
    space: spaceId,
    accessToken: accessToken,
  });

  const entries = await client.getEntries();
  console.log(entries);
  let sponsors = [];
  if (entries.items) {
    sponsors = await Promise.all(entries.items.map((item) => getSponsor(item)));
  }
  const sponsorsContent = `export default ${JSON.stringify(sponsors, '', 2)};`;
  fs.writeFileSync(
    path.resolve(__dirname, '../src/shared/sponsors-list.js'),
    sponsorsContent
  );
};

buildSponsors();
