const productSerializer = (body: any, imgURLs: string[]) => {
  const serializedBody: any = {
    name: body.name,
    description: body.description,
    prices: body.prices ? JSON.parse(body.prices) : undefined,
    storeId: body.storeId,
  };

  if (imgURLs.length) {
    serializedBody.images = imgURLs;
  }

  return serializedBody;
};

export default productSerializer;
