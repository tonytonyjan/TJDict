import LicenseKey from "LicenseKey";

describe("LicenseKey", () => {
  it("misformed", async () => {
    await expectAsync(LicenseKey.verify("")).toBeRejectedWithError(
      Error,
      /Misformed/i
    );
  });

  it("invalid JSON", async () => {
    const message = `-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

hi
-----BEGIN PGP SIGNATURE-----

iQFKBAEBCgA0FiEEYShqmh9dVXp010X06qCxGEEPUxAFAl7XvecWHHRvbnl0b255
amFuQGdtYWlsLmNvbQAKCRDqoLEYQQ9TEDDfB/9EMa/OHosxO7HnVzmtKXHySayj
L+Ti5QL8RbRicwFZeNasJkyV+/38xo9vD3cGwrsIZZkaVt1SVyfv8AncGIbMacNx
DWFGbP5VKyKPwr8tZeLEkb3TnaO3qSWLN/mNPFYgtLKM56eUHvdJhgfUJ+qk84vl
5+rGGI7+TdeAAes1WR5diwVeiN5zGhUl3M97bCpa/soyjODYjdTHG49QghRD8ymS
GaumU1VNlXppUXa35PWJ5vo6e5n3GxzjSmjLoUcBgwwmmLJQyZEOlV+LlfWpBgwa
8ozLkQmOl9dif5Edd/8s99HBadL9Cn7Xp3rVCotjK8i/GwqdLp9tQ6da05lw
=g1JC
-----END PGP SIGNATURE-----
`;
    await expectAsync(LicenseKey.verify(message)).toBeRejectedWithError(
      SyntaxError
    );
  });

  it("invalid JSON structure", async () => {
    const message = `-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

{"foo":1}
-----BEGIN PGP SIGNATURE-----

iQFKBAEBCgA0FiEEYShqmh9dVXp010X06qCxGEEPUxAFAl7XvtQWHHRvbnl0b255
amFuQGdtYWlsLmNvbQAKCRDqoLEYQQ9TELVtB/0SegHQq/w/x3ndvCLDX6qG657q
8t4Wg+ioQeQjXg6E5agMtOvsQzkWzK6boJJHzZH9yhd93mZFsvlz0ayb516eMq9g
WEXN+N3+tXWbtSvMfDpnl5ff4oHxOavnqG8oby5PUe3EJpN8ccBoKt02jDgw6cO5
e26SZ8aqRvA6HL29iHKBNNVRQm+u7G92yBcARdshLAgYURNpE5JCzV3dS0cuZ1DH
KgIf2hQH7r9z1M+fJDLXjTIPTYAQE/x4xX4Afox00P/zwbARTvnkEb64pbhhXKIA
99zKk/JyBE1Fjs+cYziS6p+BlSKwVA6lmVe2DlP6lz3pG2IGaTBxNCx8U2Yu
=R9pj
-----END PGP SIGNATURE-----
`;
    await expectAsync(LicenseKey.verify(message)).toBeRejectedWithError(
      Error,
      "license message is not valid"
    );
  });

  it("invalid expiration", async () => {
    const message = `-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

{"email":"hi@example.com","expiration":"invalid"}
-----BEGIN PGP SIGNATURE-----

iQFKBAEBCgA0FiEEYShqmh9dVXp010X06qCxGEEPUxAFAl7Xv0kWHHRvbnl0b255
amFuQGdtYWlsLmNvbQAKCRDqoLEYQQ9TENfZB/972hQP5/z7b+46yasuiYPD5HMY
adGpQ/RJBtAVgbZSLhcFcRFyqfoKrMC+EmJ5+38avA5MsCL5xhRBV1LiQ5AmC9hK
xRqcYk8t8y43JKLf5EyEZcp9pSmwVtgqnLxq2S68avkm9ZOjqWMSrDR28SHnce1v
yb8lhGnzU46SLMVxl22tip2qzwLALmiu1Jz4OcIWWiIoQJvsv63ImL8HIp1QygYf
r9yiARVaicuWUUnWgNbq2uI3/9JuXkvOQswQMYOLw25oVoJTM5divd1Tvn5MCFAz
F2OcUSlPo3nqlJvcuP8pL/yMA2o7IHzrnYpKFTDjO0y0aVB98XpOcT5h6x4u
=j0GT
-----END PGP SIGNATURE-----
`;
    await expectAsync(LicenseKey.verify(message)).toBeRejectedWithError(
      Error,
      "expiration is not valid"
    );
  });

  it("works", async () => {
    const message = `-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

{"email":"hi@example.com","expiration":"1989-11-23T11:23:23+08:00"}
-----BEGIN PGP SIGNATURE-----

iQFKBAEBCgA0FiEEYShqmh9dVXp010X06qCxGEEPUxAFAl7XwA0WHHRvbnl0b255
amFuQGdtYWlsLmNvbQAKCRDqoLEYQQ9TEGGPCACUnSelPTykaHqheFI9fwa2Cj65
O8QbiXi8WeRpg7vuvqb68r4eX8TeIsk5LZg32y+xo5Le/eUznmS8Te0S9K7+N9tf
OINH7k1iUgezJHEQMY34RZn9xypfbTc2yOTVky9Gg6xmLuyil8+CYPkBQnfLhPBB
MRmJtoNVuPQ6z69EFC/EAc2lO4Zxl7bKBXT32Rvir4GjXdkkw0d1FmYOnJ93SM9y
Ws/gTSDvVFn5WlujH0UXyus6i8hORgJDJrQFLwtvFK6d5fMKD+tc9MeLrdU/d6YT
1yc+9lTUG198dHLyxW2C+PhP8/G2FZpC4GJvxXJGGrGHidJzlrdm/mm0RlYr
=VS6o
-----END PGP SIGNATURE-----
`;
    const license = await LicenseKey.verify(message);
    expect(license.email).toBe("hi@example.com");
    expect(license.expiration).toBeInstanceOf(Date);
    expect(license.expiration.getTime()).toBe(
      Date.UTC(1989, 10, 23, 3, 23, 23)
    );
  });
});
