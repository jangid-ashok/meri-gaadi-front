const blogs = [
    {
        id: 1,
        title: "Maruti Fronx Review: Best Compact SUV?",
        slug: "maruti-fronx-review-best-compact-suv",
        shorDescription: "A deep dive into Maruti's latest compact SUV — Fronx. Performance, design, and features.",
        image: "blog-images/mercedes-lineups.png",
        author: 'John Doe',
        publishedDate: '2025-06-30',
        category: "SUV",
        description: `
          <h2>Introduction</h2>
          <p>
            Maruti Suzuki has been dominating the compact car segment in India for years, and with the Fronx, they’re trying to cement their leadership in the compact SUV space too.
            Positioned as a modern, feature-rich crossover, the Fronx combines the best of urban design, fuel efficiency, and practical performance. But does it really live up to the hype? Let's find out.
          </p>

          <h2>Design & Styling</h2>
          <p>
            The Maruti Fronx boasts a futuristic design language inspired by the Grand Vitara and Baleno. Its bold front fascia, LED DRLs, and coupe-like roofline give it a standout presence on the road.
            <strong>The rear LED strip</strong> running across the tailgate is a design trend that aligns it with modern SUV aesthetics.
          </p>

          <ul>
            <li>Dual-tone alloy wheels</li>
            <li>Roof rails for a sporty stance</li>
            <li>Premium color options including Nexa Blue and Earthen Brown</li>
          </ul>

          <h2>Interior & Features</h2>
          <p>
            Inside, the Fronx surprises with a dual-tone cabin, soft-touch materials, and a well-integrated infotainment system. The dashboard layout is clean and user-friendly, and there's ample legroom even for rear passengers.
          </p>

          <h3>Key Interior Features:</h3>
          <ul>
            <li>9-inch SmartPlay Pro+ touchscreen</li>
            <li>Wireless Android Auto & Apple CarPlay</li>
            <li>Arkamys-tuned audio system</li>
            <li>360-degree camera and Heads-up Display</li>
          </ul>

          <h2>Engine & Performance</h2>
          <p>
            The Fronx offers two engine options: a 1.2L DualJet petrol and a 1.0L BoosterJet turbo petrol. While the 1.2L offers balanced mileage and drive comfort, the BoosterJet variant adds more punch for highway driving.
          </p>

          <table>
            <thead>
              <tr><th>Variant</th><th>Power</th><th>Mileage</th></tr>
            </thead>
            <tbody>
              <tr><td>1.2L DualJet</td><td>89 BHP</td><td>21.5 km/l</td></tr>
              <tr><td>1.0L BoosterJet</td><td>100 BHP</td><td>20.1 km/l</td></tr>
            </tbody>
          </table>

          <h2>Ride & Handling</h2>
          <p>
            The suspension is tuned well for city potholes and offers a comfortable drive. The steering is light, making it easy for urban maneuvers, but could feel vague at higher speeds.
            On curves, the Fronx holds its line decently but isn't sporty.
          </p>

          <blockquote>
            "Fronx delivers a smooth, no-nonsense driving experience — ideal for both first-time buyers and city commuters." — AutoXpertIndia
          </blockquote>

          <h2>Safety</h2>
          <p>
            Safety is another strong point, with 6 airbags in the top variants, ESP, hill-hold assist, and ISOFIX mounts. While the GNCAP crash test results are yet to be released, Maruti claims to have reinforced the frame.
          </p>

          <h2>Verdict</h2>
          <p>
            The Maruti Fronx checks most boxes for an urban Indian car buyer: style, features, mileage, and brand trust. If you're not chasing pure performance but want a well-rounded compact SUV,
            the Fronx might just be the right fit for you.
          </p>

          <p><strong>Rating:</strong> ⭐⭐⭐⭐☆ (4.3/5)</p>
        `,
      },
    {
        id: 2,
        title: "Top 5 Electric Cars in India (2025)",
        slug: "top-5-electric-cars-in-india-2025",
        shorDescription: "We compare the top 5 EVs available in the Indian market with specs and price.",
        image: "blog-images/audi-r8.webp",
        author: 'John Doe',
        publishedDate: '2025-06-30',
        category: "EV",
        description: `Electric cars are no longer a thing of the future in India — they’re here and gaining ground fast. In this article, we cover the top 5 EVs that stand out in 2025: Tata Nexon EV, MG ZS EV, Hyundai Ioniq 5, Mahindra XUV400, and the BYD Atto 3. From range and performance to charging time and tech integration, each model brings something unique. We also look at running costs, service networks, and real-world range. Whether you're eco-conscious or tech-savvy, this roundup will help you choose the right EV that fits your lifestyle and budget.`,
    },
    {
        id: 3,
        title: "Hyundai Verna vs Honda City: Sedan Showdown",
        slug: "hyundai-verna-vs-honda-city-sedan-showdown",
        shorDescription: "Which one offers better value, performance, and comfort? Here's our breakdown.",
        image: "blog-images/pexels-wardmediauk-3647693.jpg",
        author: 'John Doe',
        publishedDate: '2025-06-30',
        category: "Sedan",
        description: `The battle for the top spot in the sedan segment has always been fierce, but 2025 brings two refined contenders — the all-new Hyundai Verna and the evergreen Honda City. Verna comes loaded with futuristic design and an array of tech features including ADAS, while City continues to impress with its refined engine, spacious cabin, and timeless appeal. We tested both on highways, city traffic, and winding roads to evaluate real-world performance. While Verna wins on tech and design, City still holds the crown for ride comfort and reliability. It all boils down to what matters more to you — flair or familiarity.`,
    },
    {
        id: 4,
        title: "2025 Tata Harrier: What's New?",
        slug: "2025-tata-harrier-whats-new",
        shorDescription: "Tata gives the Harrier a fresh update — we look at design, engine, and tech changes.",
        image: "blog-images/mazda-SUV.png",
        author: 'John Doe',
        publishedDate: '2025-06-30',
        category: "SUV",
        description: `The Tata Harrier gets a fresh update for 2025, and it’s more than just a facelift. The design tweaks make it bolder with a more aggressive grille and sleeker LED lighting. Underneath, the 2.0L diesel engine remains but has been tuned for smoother power delivery. The interiors are where the Harrier truly shines now — with a massive 12.3-inch touchscreen, ventilated seats, and a panoramic sunroof. Tata has also introduced ADAS features like lane assist and blind spot detection. With this update, the Harrier feels like a premium SUV that punches well above its price bracket.`,
    },
    {
        id: 5,
        title: '2025 Maruti Swift Review',
        shortDescription: 'An in-depth look into the performance, mileage, and interior of the new Swift.',
        image: 'https://source.unsplash.com/400x250/?car,swift',
        author: 'John Doe',
        publishedDate: '2025-06-30',
        imageName: 'swift',
        slug: '2025-maruti-swift-review',
        category: "Hatchback",
        description: `The Maruti Swift 2025 continues to build on its legacy with evolutionary design changes and a brand-new powertrain. The new platform makes it lighter and more agile, while the improved 1.2L petrol engine offers better mileage and responsiveness. Inside, the updated dashboard and new infotainment system with wireless Apple CarPlay bring it up to speed with modern expectations. It’s still fun to drive, easy to maintain, and now more stylish than ever. The Swift remains a top pick for young buyers and city dwellers looking for a reliable, peppy ride.`,
    },
    {
        id: 6,
        title: 'Hyundai Creta 2025 – First Drive',
        shortDescription: 'The Creta just got better with more tech and powerful engine options.',
        image: 'https://source.unsplash.com/400x250/?car,creta',
        author: 'John Doe',
        publishedDate: '2025-06-30',
        imageName: 'creta',
        slug: 'hyundai-creta-2025-first-drive',
        category: "Compact SUV",
        description: `We took the 2025 Hyundai Creta for a spin and came back impressed. The bold new design gives it a road presence that's hard to ignore. Inside, the Creta now comes with a twin-screen layout, a digital driver display, and a lot more soft-touch materials. The 1.5L turbo petrol is punchy yet refined, and the DCT gearbox handles shifts effortlessly. Safety has also seen a major boost with six airbags standard and advanced driver aids. The new Creta is a well-rounded package that continues to dominate the compact SUV space.`,
    },
    {
        id: 7,
        title: 'Tata Nexon EV – Worth the Hype?',
        shortDescription: 'We tested the Nexon EV to find out if it delivers as promised.',
        image: 'https://source.unsplash.com/400x250/?car,nexon',
        author: 'John Doe',
        publishedDate: '2025-06-30',
        imageName: 'nexon',
        slug: 'tata-nexon-ev-worth-the-hype',
        category: "Compact SUV",
        description: `Tata’s Nexon EV has quickly become the poster child of India's electric revolution. We tested the updated model with its 453 km ARAI-certified range and came away impressed by its real-world efficiency and drive comfort. The updated styling, illuminated grille, and larger infotainment screen add to the appeal. It’s silent, spacious, and loaded with features like connected car tech, OTA updates, and more. The Nexon EV is no longer a niche product — it’s practical, future-ready, and a serious alternative to petrol cars in the same price range.`,
    },
    {
        id: 8,
        title: '2025 Maruti Swift Review',
        shortDescription: 'An in-depth look into the performance, mileage, and interior of the new Swift.',
        image: 'https://source.unsplash.com/400x250/?car,swift',
        author: 'John Doe',
        publishedDate: '2025-06-30',
        imageName: 'swift',
        slug: '2025-maruti-swift-review-new',
        category: "Hatchback",
        description: `The 2025 Swift brings back everything people loved — with added refinement. The exterior sees sharper cuts and a wider grille, while the cabin is now more premium with better seats and ambient lighting. Maruti has also improved the NVH levels, making the Swift quieter on highways. It handles city traffic like a breeze and still brings a smile with its zippy nature. A perfect mix of affordability and personality.`,
    },
    {
        id: 9,
        title: 'Hyundai Creta 2025 – First Drive',
        shortDescription: 'The Creta just got better with more tech and powerful engine options.',
        image: 'https://source.unsplash.com/400x250/?car,creta',
        author: 'John Doe',
        publishedDate: '2025-06-30',
        imageName: 'creta',
        slug: 'hyundai-creta-2025-first-drive-new',
        category: "Compact SUV",
        description: `In its latest avatar, the Hyundai Creta reasserts itself as the most tech-savvy compact SUV on the market. The cabin now resembles premium offerings, thanks to seamless displays and a richer layout. Driving it feels more refined, especially with the new suspension tuning. Whether you're cruising on the highway or zipping through city traffic, the Creta remains a balanced performer.`,
    },
    {
        id: 10,
        title: 'Tata Nexon EV – Worth the Hype?',
        shortDescription: 'We tested the Nexon EV to find out if it delivers as promised.',
        image: 'https://source.unsplash.com/400x250/?car,nexon',
        author: 'John Doe',
        publishedDate: '2025-06-30',
        imageName: 'nexon',
        slug: 'tata-nexon-ev-worth-the-hype-new',
        category: "Compact SUV",
        description: `The Nexon EV’s updated version shows Tata Motors' commitment to making electric mobility more mainstream. With improved acceleration, quicker charging, and sleeker design updates, it addresses most user feedback. If you're looking for an electric SUV under ₹20 lakh that blends tech, style, and utility — the Nexon EV remains a top contender.`,
    },
];

export default blogs;
