type GCR struct {
	Results []Result `json:"results"`
	Status string `json:"status"`

}
type Result struct{
	Addresscomponent []string `json:"address_components"`
	Formatted_address string `json:"formatted_address"`
	Geometry Geometry_Class `json:"geometry"`
	Place_id string `json:"place_id"`
	Types []string `json:"types"`
}
type Geometry_Class struct {
	Bounds string `json:"bounds"`
	Location Location_class `json:"location"`  
	Location_type string `json:"location_type"`  
	Viewport string `json:"viewport"`  
}

type Location_class struct {
	Lat string `json:"lat"`
	Lng string `json:"lng"`  
}