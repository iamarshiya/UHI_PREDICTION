import requests
import json

def fetch_and_print_pune_report():
    report_lines = []
    
    def log(msg=""):
        print(msg)
        report_lines.append(msg)

    log("================ SMART HEAT RISK REPORT ================")
    log("Fetching live satellite and weather data... (This takes about ~25 seconds)")
    
    try:
        resp = requests.get("http://127.0.0.1:5000/analyze?city=Pune")
        if resp.status_code != 200:
            log(f"Error fetching data: {resp.status_code}")
            return
            
        data = resp.json()
        
        localities = list(set([f["properties"].get("locality", "Unknown") for f in data["features"] if f["properties"].get("locality", "Unknown") != "Unknown"]))
        
        log("\n=========== AVAILABLE LOCALITIES ===========")
        for i, loc in enumerate(sorted(localities), start=1):
            log(f"{i}. {loc}")
            
        log("\n🏆 TOP 10 MOST LIVABLE LOCALITIES IN PUNE:")
        for idx, loc in enumerate(data.get("rankings", {}).get("most_livable", [])[:10], start=1):
            log(f"  {idx}. {loc['locality']} (Livability Index: {loc['livability_index']:.2f})")
            
        log("\n🚨 TOP 10 LEAST LIVABLE LOCALITIES IN PUNE:")
        for idx, loc in enumerate(data.get("rankings", {}).get("least_livable", [])[:10], start=1):
            log(f"  {idx}. {loc['locality']} (Livability Index: {loc['livability_index']:.2f})")
            
        
        sample_feature = next((f for f in data["features"] if f["properties"].get("locality", "Unknown") != "Unknown"), None)
        
        if sample_feature:
            sample = sample_feature["properties"]
            coords = sample_feature["geometry"]["coordinates"]
            log(f"\n================ SMART CITY REPORT ================\n")
            log(f"📍 Location Point: {sample['locality']} ({coords[1]:.4f}, {coords[0]:.4f})")
            log(f"🌡 Live Ambient Temp: {sample['ambient_temp_celsius']} °C")
            log(f"🏠 Livability Status: {sample['livability_status']}")
            log(f"🧠 AI Summary: {sample['health_summary']}")

            log(f"\n🔥 Heat Risk Score: {sample['risk']:.2f} /100")
            log(f"🌱 Green Deficit: {sample['green_deficit']}")
            log(f"❄  Cooling Potential: {sample['cooling_potential']} °C")
            log(f"👥 People at Risk (est): {sample.get('people_at_risk', 'Unknown')}")
            log(f"⏳ Future Risk (3 months): {sample['future_risk_3months']}")
            
            if sample.get('early_warning'):
                log(f"🚨 EARLY WARNING: High Risk Trend Detected!")

            log("\n🔍 Main Statistical Drivers mapping to Risk:")
            for d in sample.get("top_drivers", []):
                log("   • " + d)

            log("\n🛠 AI Recommended Interventions for this Coordinate:\n")
            for s in sample.get("mitigation_actions", []):
                log("   • " + s)

            log(f"\n🛡 Urban Resilience Score: {sample['resilience_score']:.2f}")

            log("\n===================================================\n")
            
    except Exception as e:
        log(f"Failed to connect to backend: {e}")
        
    # Write everything to file
    with open("pune_realtime_report.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(report_lines) + "\n")
        
    print("\n✅ Report saved to pune_realtime_report.txt!")

if __name__ == "__main__":
    fetch_and_print_pune_report()
