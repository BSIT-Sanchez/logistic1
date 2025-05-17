import { Listing } from "../models/listing.model.js";
import { ListingStocks } from "../models/listingStocks.model.js";

// Function to predict demand based on the last 3 months of stock movements and sales
export const predictDemand = async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // Calculate demand based on sales and stock movement in the past 6 months
    const listings = await Listing.find();

    const demandData = await Promise.all(
      listings.map(async (listing) => {
        const stockMovements = await ListingStocks.find({
          listing: listing._id,
          acquisitionDate: { $gte: sixMonthsAgo },
        });

        // Predict demand based on average movement or quantity sold over the last 6 months
        const totalQuantityMoved = stockMovements.reduce(
          (sum, stock) => sum + stock.quantity,
          0
        );

        const averageMovement = totalQuantityMoved / stockMovements.length;

        return {
          itemCode: listing.itemCode,
          title: listing.title,
          predictedDemand: averageMovement * 30, // Project demand for the next month
        };
      })
    );

    res.status(200).json({ success: true, demandData });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
