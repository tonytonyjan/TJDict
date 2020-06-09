import verifyLicense from "verifyLicense";

describe("verifyLicense", () => {
  it("misformed", async () => {
    await expectAsync(verifyLicense("")).toBeRejectedWithError(
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
    await expectAsync(verifyLicense(message)).toBeRejectedWithError(
      SyntaxError
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
    const license = await verifyLicense(message);
    expect(license).toEqual({
      email: "hi@example.com",
      expiration: "1989-11-23T11:23:23+08:00",
    });
  });
});
